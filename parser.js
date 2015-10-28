'use strict';
var marked = require('marked');
var templating = require('./templating.js');

var html;
var commonClass = 'module';
var sectionsCovered;
var sectionClasses;
var sectionStyles;
var extraStyles;
var outputFilePath = './jseditor/public/posts';
var relativeFilePath = 'posts';
var totalSections;
var jsonObjects;
var templating;
var cloudinaryPath = 'http://res.cloudinary.com/realarpit/image/upload';

function parse(requestData)
{
    jsonObjects = JSON.parse(requestData);
    templating.loadTemplates();
    return parseData(jsonObjects);
}

function testRead(fileName)
{
    var testJson = templating.loadFile(fileName);
    return parse(testJson);
}

function processRequest(host)
{
    return templating.processData(host);
}

function parseData(jsonObjects)
{
    html = '';
    sectionsCovered = 0;
    totalSections = jsonObjects.sections.length;
    jsonObjects.sections.forEach(handleSection);

    if ('publish' == jsonObjects.page) {
        return html;
    }

    var finalHTML = templating.getPageTemplate(jsonObjects.title, jsonObjects.page_description, html);
    if (undefined !== jsonObjects.id && '' != jsonObjects.id) {
        var outputFileName = jsonObjects.id + '.html';
        templating.writeFile(outputFilePath + '/' + outputFileName, finalHTML);
    }
    return finalHTML;
}

function handleSection(section, index, allSections)
{
    section = doMarkUp(section);

    sectionClasses = getSectionClasses(section);
    sectionStyles = getSectionStyles(section);
    extraStyles = getExtraStyles(section);

    templating.setSectionClasses(sectionClasses);
    templating.setSectionStyles(sectionStyles);
    templating.setExtraStyles(extraStyles);
    templating.setSection(section);
    
    switch(section['type']) {
        case 'summary':
        case 'richContent':
        case 'content':
            html += templating.getCommonTemplate();
            break;
        case 'video':
            html += templating.getVideoTemplate();
            break;
        case 'image':
            if (isTrue(section, 'banner')) {
                html += templating.getBannerTemplate();
            } else {
                var imageObject = getImageObject(sectionClasses, sectionStyles, section);
                html += templating.getImageTemplate(imageObject);
            }
            break;
        case 'slider':
            html += templating.getSliderTemplate();
            break;
        case 'gallery':
            html += templating.getGalleryTemplate();
            break;
        // case 'grouped':
        //     html += getGroupedSection(sectionClasses, sectionStyles, extraStyles, section);
        //     break;
    }

    sectionsCovered++;
}



function getImageObject(sectionClasses, sectionStyles, section)
{
    if (undefined === section['layout']) {
        section['layout'] = 'normal';
    }
    var imageName = section['url'].substring(section['url'].lastIndexOf('/')+1);
    var imagePath450 = cloudinaryPath + '/w_450,c_fit/' + imageName;
    var imagePath650 = cloudinaryPath + '/w_650,c_fit/' + imageName;
    var imagePath1024 = cloudinaryPath + '/w_1024,c_fit/' + imageName;
    var imagePath1366 = cloudinaryPath + '/w_1366,c_fit/' + imageName;
    var imagePath2560 = cloudinaryPath + '/w_2560,c_fit/' + imageName;

    var imageObject = {
        sectionClasses: sectionClasses, 
        sectionStyles: sectionStyles,
        width: section['width'],
        height: section['height'],
        imagePath450 : imagePath450,
        src: section['url'],
        classes: section['class'],
        alt: section['alt'],
        layout: section['layout'],
        type: 'image'
    };
    
    switch (section['layout']) {
        case 'small':
            //no srcsets for small layout
            break;
        case 'normal':
            imageObject.imagePath650 = imagePath650;
            break;
        case 'big':
            imageObject.imagePath650 = imagePath650;
            imageObject.imagePath1024 = imagePath1024;
            imageObject.imagePath1366 = imagePath1366;
            break;
        case 'cover':
            imageObject.imagePath650 = imagePath650;
            imageObject.imagePath1024 = imagePath1024;
            imageObject.imagePath1366 = imagePath1366;
            imageObject.imagePath2560 = imagePath2560;
            break;
    }

    return imageObject;
}

function addSectionLayoutClass(sectionClasses, section)
{
    switch(section['type']) {
        case 'image':
        case 'gallery':
        case 'slider':
            if (undefined === section['layout']) {
                section['layout'] = 'normal';
            }
            sectionClasses.push('module-size-'+section['layout']);
            break;
    }

    return sectionClasses;
}

function addSectionTypeClass(sectionClasses, section)
{
    switch(section['type']) {
        case 'image':
            if (true == section['banner']) {
                sectionClasses.push("builder-section-banner");
            } else {
                sectionClasses.push("module-type-image");
            }
            break;
        case 'summary':
            sectionClasses.push("module-type-summary");
            break;
        case 'video':
            sectionClasses.push("module-type-video");
            break;
        case 'richContent':
        case 'content':
            sectionClasses.push("module-type-text");
            break;
        // case 'grouped':
        case 'slider':
            sectionClasses.push('module-type-slider');
            break;
        case 'gallery':
            sectionClasses.push('module-type-gallery');
            break;

    }
    return sectionClasses;
}

function addBackgroundClass(sectionClasses, section)
{
    if (!isEmpty(section, "backgroundImage")) {
        sectionClasses.push("module-bg-image");
    }

    if (!isEmpty(section, "backgroundFade")) {
        sectionClasses.push("module-bg-fade");
    }

    if (!isEmpty(section, "foregroundColor") && "#FFF" == section['foregroundColor']) {
        sectionClasses.push("module-fg-light");
    }

    if (isTrue(section, "backgroundRepeat")) {
        sectionClasses.push("module-bg-repeat");
    }
    // if (!isEmpty(section, "backgroundColor")) {
    //     sectionClasses.push("module-bg-color");
    // }
    
    if (!isEmpty(section, "backgroundClass")) {
        sectionClasses.push("module-bg-color");
        sectionClasses.push(section['backgroundClass']);
    }

    return sectionClasses;
}

// function addColumnClass(sectionClasses, section)
// {
//     if (!isEmpty(section, "columns")) {
//         sectionClasses.push("builder-text-columns-"+section["columns"].length);
//     }

//     if ('gallery' == section['type']) {
//         var galleryImageCount = section["images"].length;
//         if (galleryImageCount > 4) {
//             sectionClasses.push("builder-gallery-columns-4");
//         } else {
//             sectionClasses.push("builder-gallery-columns-"+galleryImageCount);
//         }
//     }

//     return sectionClasses;
// }

function addParallaxClass(sectionClasses, section)
{
    if (isTrue(section, "parallax")) {
        sectionClasses.push("module-bg-parallax");
    }
    
    return sectionClasses;
}

function getSectionClasses(section)
{
    var sectionClasses = [];
    sectionClasses.push(commonClass);

    sectionClasses = addSectionTypeClass(sectionClasses, section);
    sectionClasses = addSectionLayoutClass(sectionClasses, section);
    sectionClasses = addBackgroundClass(sectionClasses, section);
    // sectionClasses = addColumnClass(sectionClasses, section);
    sectionClasses = addParallaxClass(sectionClasses, section);

    return sectionClasses.join(' ');
}

function getSectionStyles(section)
{
    var sectionStyles = [];
    if (!isEmpty(section, "backgroundImage")) {

        sectionStyles.push("background-image: url('"+section["backgroundImage"]+"');");

        //temp. check
        if (isEmpty(section, "backgroundFade")) {
            section['backgroundFade'] = false;
        }
    }
    if (!isEmpty(section, "backgroundColor")) {
        sectionStyles.push("background-color:" + section["backgroundColor"]+";");
    }

    if ('slider' === section['type']) {
        sectionStyles.push('background-size: cover;');
    }

    return sectionStyles.join(' ');
}

function getExtraStyles(section)
{
    var extraStyles = [];
    if (!isEmpty(section, "foregroundColor") && 'summary' === section['type']) {
        extraStyles.push("color:" + section["foregroundColor"]+";");
    }
    return extraStyles.join(' ');
}

function isDefined(section, attribute)
{
    return (undefined !== section[attribute]);
}

function isEmpty(section, attribute)
{
    return (!isDefined(section, attribute) || "" == section[attribute]);
}

function isTrue(section, attribute)
{
    return (isDefined(section, attribute) && true === section[attribute]);
}

function isFalse(section, attribute)
{
    return (isDefined(section, attribute) && false === section[attribute]);
}

function doMarkUp(section)
{
    if (!isEmpty(section, 'text')) {
        section['text'].replace('\n', '<br />');
    }
    if ('richContent' != section['type'] && !isEmpty(section, 'text')) {
        section['text'] = marked(section['text']);
    }

    return section;
}

module.exports = {
    parse: parse,
    processRequest: processRequest,
    testRead: testRead
}
/////////////////////

function getSectionObject(section)
{
    var sectionClasses= getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);
    var extraStyles = getExtraStyles(section);
    section = doMarkUp(section);

    if ('image' == section['type']) {
        return getImageObject(sectionClasses, sectionStyles, section);
    }

    if ('summary' == section['type']) {
        return { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            extraStyles: extraStyles,
            text: section["text"],
            type: section['type']
        };
    }

    if ('content' == section['type']) {
        return { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            extraStyles: extraStyles,
            text: section["text"],
            type: section['type']
        };
    }

    if ('video' == section['type']) {
        return {
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            url: section['url'],
            height: section["height"],
            width: section["width"],
            type: section['type']
        }
    }

    return section;
}

// function getGroupedSection(sectionClasses, sectionStyles, extraStyles, section)
// {
//     var columns = [];
//     var column;
//     var allColumns = section['columns'];
//     for (column in allColumns) {
//         var sectionObject = getSectionObject(allColumns[column]);
//         columns.push(sectionObject);
//     }

//     return templating.getGroupedTemplate(sectionClasses, sectionStyles, extraStyles, columns);
// }