'use strict';
var marked = require('marked');
var templating = require('./templating.js');

var html
, firstSectionHTML
, commonClass = 'module'
, sectionsCovered
, sectionClasses
, sectionStyles
, outputFilePath = './jseditor/public/posts'
, relativeFilePath = 'posts'
, totalSections
, jsonObjects
, templating
, parsedData
, cloudinaryPath = 'http://res.cloudinary.com/realarpit/image/upload'
, cdnPath = 'http://i1.blogs.es'
;

function parse(requestData)
{
    jsonObjects = JSON.parse(requestData);
    if ('meta' in jsonObjects && 'homepage' in jsonObjects.meta) {
        if ('content' in jsonObjects.meta.homepage) {
            jsonObjects.meta.homepage.content = doMarkUp(jsonObjects.meta.homepage.content);
        }
        if ('image' in jsonObjects.meta.homepage && 'url' in jsonObjects.meta.homepage.image) {
            jsonObjects.meta.homepage.image.name = getImageName(jsonObjects.meta.homepage.image.url);
        }
    }

    templating.loadTemplates();
    parsedData = parseData(jsonObjects);

    var response = {
        'meta' : jsonObjects.meta,
        'parsedData': parsedData
    }

    return JSON.stringify(response);
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
    firstSectionHTML = '';
    sectionsCovered = 0;
    totalSections = jsonObjects.sections.length;

    jsonObjects.sections.forEach(handleSection);

    var contentHTML = templating.getContentTemplate(firstSectionHTML, html);
    if ('publish' == jsonObjects.page) {
        return contentHTML;
    }

    var finalHTML = templating.getPageTemplate(jsonObjects.title, jsonObjects.page_description, contentHTML);
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

    templating.setSectionClasses(sectionClasses);
    templating.setSectionStyles(sectionStyles);
    
    switch(section['type']) {
        case 'summary':
        case 'richContent':
        case 'content':
            templating.setSection(section);
            html += templating.getCommonTemplate();
            break;
        case 'video':
            templating.setSection(section);
            html += templating.getVideoTemplate();
            break;
        case 'image':
            templating.setSection(section);
            if (isTrue(section, 'banner')) {
                html += templating.getBannerTemplate();
            } else {
                var imageObject = getImageObject(sectionClasses, sectionStyles, section);
                html += templating.getImageTemplate(imageObject);
            }
            break;
        case 'slider':
            section['images'] = getImageCdnPaths(section['images']);
            templating.setSection(section);
            html += templating.getSliderTemplate();
            break;
        case 'gallery':
            section['images'] = getImageCdnPaths(section['images']);
            templating.setSection(section);
            html += templating.getGalleryTemplate();
            break;
        case 'grouped':
            templating.setSection(section);
            html += getGroupedSection(sectionClasses, sectionStyles, section);
            break;
    }

    if ('' == firstSectionHTML) {
        firstSectionHTML = html;
        html = ''
    }

    sectionsCovered++;
}


function getImageObject(sectionClasses, sectionStyles, section)
{
    if (isEmpty(section, 'layout')) {
        section['layout'] = 'normal';
    }
    if (isEmpty(section, 'description')) {
        section['description'] = '';
    }
    var imageName = getImageName(section['url']);
    var imagePathNormal = cdnPath + '/' + imageName;
    var imagePath450 = cdnPath + '/w_450,c_fit/' + imageName;
    var imagePath650 = cdnPath + '/w_650,c_fit/' + imageName;
    var imagePath1024 = cdnPath + '/w_1024,c_fit/' + imageName;
    var imagePath1366 = cdnPath + '/w_1366,c_fit/' + imageName;
    var imagePath2560 = cdnPath + '/w_2560,c_fit/' + imageName;

    var imageObject = {
        sectionClasses: sectionClasses, 
        sectionStyles: sectionStyles,
        width: section['width'],
        height: section['height'],
        imagePath450 : imagePath450,
        src: imagePathNormal,
        classes: section['class'],
        alt: section['alt'],
        layout: section['layout'],
        type: 'image',
        size: section['size'],
        description: section['description']
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
            sectionClasses.push("module-type-rich");
            break;
        case 'content':
            sectionClasses.push("module-type-text");
            break;
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
        
        if (!isEmpty(section, "backgroundFade")) {
            sectionClasses.push("module-bg-fade");
        }
    }

    if (!isEmpty(section, "foregroundColor") && "#FFF" == section['foregroundColor']) {
        sectionClasses.push("module-fg-light");
    }

    if (isTrue(section, "backgroundRepeat")) {
        sectionClasses.push("module-bg-repeat");
    }
    
    if (!isEmpty(section, "backgroundClass")) {
        sectionClasses.push("module-bg-color");
        sectionClasses.push(section['backgroundClass']);
    }

    return sectionClasses;
}

function addColumnClass(sectionClasses, section)
{
    if ('grouped' == section['type']) {
        sectionClasses.push("module-layout-columns");
    } else {
        sectionClasses.push("module-layout-single");
    }

    return sectionClasses;
}

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
    sectionClasses = addColumnClass(sectionClasses, section);
    sectionClasses = addParallaxClass(sectionClasses, section);

    return sectionClasses.join(' ');
}

function getSectionStyles(section)
{
    var sectionStyles = [];
    if (isEmpty(section, "backgroundImage")) {
        section['backgroundFade'] = false;
    } else {

        var imageName = getImageName(section['backgroundImage']);
        var imageCdnPath = cdnPath + '/' + imageName;

        sectionStyles.push("background-image: url('"+imageCdnPath+"');");

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

function getImageCdnPaths(images)
{
    var totalImages = images.length;
    for (var i = 0; i < totalImages; i++) {
        images[i].url = cdnPath + '/' + getImageName(images[i].url);
    }

    return images;
}

function getSectionObject(section)
{
    var sectionClasses = [];
    sectionClasses = addSectionTypeClass(sectionClasses, section);
    sectionClasses = addBackgroundClass(sectionClasses, section);
    sectionClasses = addParallaxClass(sectionClasses, section);

    sectionClasses = sectionClasses.join(' ');
    var sectionStyles = getSectionStyles(section);
    section = doMarkUp(section);

    switch(section['type']) {
        case 'image':
            return getImageObject(sectionClasses, sectionStyles, section);
        case 'gallery':
            return {
                sectionClasses: sectionClasses, 
                sectionStyles: sectionStyles,
                images: getImageCdnPaths(section['images']),
                type: section['type']
            };
        case 'slider':
            return { 
                sectionClasses: sectionClasses, 
                sectionStyles: sectionStyles,
                title: section['title'],
                images: getImageCdnPaths(section['images']),
                autoplay: section['autoplay'],
                type: section['type']
            };
        case 'summary':
        case 'content':
        case 'richContent':
            return { 
                sectionClasses: sectionClasses, 
                sectionStyles: sectionStyles,
                text: section["text"],
                type: section['type'],
                size: section['size']
            };
        case 'video':
            return {
                sectionClasses: sectionClasses, 
                sectionStyles: sectionStyles,
                url: section['url'],
                height: section["height"],
                width: section["width"],
                type: section['type'],
                size: section['size']
            }
    }

    return section;
}

function getGroupedSection(sectionClasses, sectionStyles, section)
{
    var columns = [];
    var column;
    var allColumns = section['columns'];
    for (column in allColumns) {
        var sectionObject = getSectionObject(allColumns[column]);
        if (isEmpty(sectionObject, 'size')) {
            sectionObject.size = 'normal';
        }
        columns.push(sectionObject);
    }

    return templating.getGroupedTemplate(sectionClasses, sectionStyles, columns);
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

function getImageName(url)
{
    return url.substring(url.lastIndexOf('/')+1);
}

module.exports = {
    parse: parse,
    processRequest: processRequest,
    testRead: testRead
}