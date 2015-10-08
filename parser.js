'use strict';
var marked = require('marked');
var templating = require('./templating.js');

var html;
var commonClass = 'builder-section';
var sectionsCovered;
var sectionClasses;
var sectionStyles;
var extraStyles;
var skipSections = 0;
var outputFilePath = './jseditor/public/posts';
var relativeFilePath = 'posts';
var totalSections;
var jsonObjects;
var templating;
var cloudinaryPath = 'http://res.cloudinary.com/realarpit/image/upload';

function parse(requestUrl, requestData)
{
    jsonObjects = JSON.parse(requestData);
    templating.loadTemplates();
    return parseData(jsonObjects);
}

function testRead(fileName)
{
    var testJson = templating.loadFile(fileName);
    jsonObjects = JSON.parse(testJson);
    templating.loadTemplates();
    return parseData(jsonObjects);
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
    while (skipSections > 0) {
        skipSections--;
        return;
    }

    section = doMarkUp(section);

    sectionClasses = getSectionClasses(section);
    sectionStyles = getSectionStyles(section);
    extraStyles = getExtraStyles(section);

    if (isEmpty(section, 'align')) {
        templating.setSectionClasses(sectionClasses);
        templating.setSectionStyles(sectionStyles);
        templating.setExtraStyles(extraStyles);
        templating.setSection(section);
        
        switch(section.type) {
            case 'video':
                html += templating.getVideoTemplate();
                break;
            case 'videoBanner':
                html += templating.getVideoBannerTemplate();
                break;
            case 'slider':
                html += templating.getSliderTemplate();
                break;
            case 'summary':
                html += templating.getSummaryTemplate();
                break;
            case 'gallery':
                html += templating.getGalleryTemplate();
                break;
            case 'richContent':
                html += templating.getSingleColumnTemplate(); //same templating for richContent and singleColumn
                break;
            case 'image':
                if (isTrue(section, 'banner')) {
                    html += templating.getBannerTemplate();
                } else {
                    var imageObject = getImageObject(sectionClasses, sectionStyles, section);
                    html += templating.getImageTemplate(imageObject);
                }
                break;
            case 'content':
                html += templating.getSingleColumnTemplate();
                break;
        }
    } else {
        html += getMutiColumnSection(section, index, allSections);
    }

    sectionsCovered++;
}

function addSection(columns, section)
{
    if ('image' == section.type) {
        var sectionClasses = getSectionClasses(section);
        var sectionStyles = getSectionStyles(section);
        var imageObject = getImageObject(sectionClasses, sectionStyles, section); 
        columns.push(imageObject);
    } else if ('summary' == section.type) {
        var sectionClasses = getSectionClasses(section);
        var sectionStyles = getSectionStyles(section);
        var extraStyles = getExtraStyles(section);
        var summaryObject = getSummaryObject(sectionClasses, sectionStyles, extraStyles, section);
        columns.push(summaryObject);
    } else {
        columns.push(section);
    }

    return columns;
}

function getMutiColumnSection(section, index, allSections)
{
    var totalColumns = 1;
    var columns = [];
    columns = addSection(columns, section);
    skipSections = 0;

    var nextIndex = index + 1;
    var nextToNextIndex = index + 2;

    if ('section-align-left' === section.align) {
        if ('center' == allSections[nextIndex]["align"]) {
            skipSections++;
            totalColumns++;
            columns = addSection(columns, allSections[nextIndex]);
            allSections[nextIndex] = doMarkUp(allSections[nextIndex]);
            if ('section-align-right' == allSections[nextToNextIndex]["align"]) {
                skipSections++;
                totalColumns++;
                allSections[nextToNextIndex] = doMarkUp(allSections[nextToNextIndex]);
                columns = addSection(columns, allSections[nextToNextIndex]);
            }
        } else if ('section-align-right' == allSections[nextIndex]["align"]) {
            skipSections++;
            totalColumns++;
            columns = addSection(columns, allSections[nextIndex]);
            allSections[nextIndex] = doMarkUp(allSections[nextIndex]);
        }
    }

    sectionClasses += ' builder-text-columns-'+totalColumns;
    sectionClasses += ' builder-section-text';
    return templating.getMultiColumnTemplate(sectionClasses, sectionStyles, columns);
}

function getSummaryObject(sectionClasses, sectionStyles, extraStyles, section)
{
    return { 
        sectionClasses: sectionClasses, 
        sectionStyles: sectionStyles,
        extraStyles: extraStyles,
        text: section["text"],
        type: 'summary'
    };

}

function getImageObject(sectionClasses, sectionStyles, section)
{

    if (undefined === section.layout) {
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
        width: section.width,
        height: section.height,
        imagePath450 : imagePath450,
        src: section.url,
        classes: section.class,
        alt: section.alt,
        layout: section.layout,
        type: 'image'
    };
    
    switch (section.layout) {
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

function addFirstLastClass(sectionClasses)
{
    if (0 === sectionsCovered) {
        sectionClasses.push("builder-section-first");
    } else if (sectionsCovered === totalSections - 1) {
        sectionClasses.push("builder-section-last");
    }

    return sectionClasses;
}

function addSectionLayoutClass(sectionClasses, section)
{
    switch(section.type) {
        case 'image':
        case 'richContent':
            if (undefined === section.layout) {
                section['layout'] = 'normal';
            }
            sectionClasses.push('asset-size-'+section.layout);
            break;
    }

    return sectionClasses;
}

function addSectionTypeClass(sectionClasses, section)
{
    var bannerClass = "builder-section-banner";
    var textClass = "builder-section-text";


    switch(section.type) {
        case 'image':
            if (true == section.banner) {
                sectionClasses.push(bannerClass);
            } else {
                sectionClasses.push(textClass);
            }
            break;
        case 'richContent':
        case 'content':
        case 'summary':
            sectionClasses.push(textClass);
            break;
        case 'slider':
            sectionClasses.push(bannerClass);
            break;
        case 'gallery':
            sectionClasses.push(
                'builder-section-gallery', 
                'builder-gallery-captions-reveal', 
                'builder-gallery-captions-dark', 
                'builder-gallery-aspect-landscape'
            );
            break;

    }
    return sectionClasses;
}

function addBackgroundClass(sectionClasses, section)
{
    if ('banner' != section.type 
        && (!isEmpty(section, "backgroundImage") || !isEmpty(section, "backgroundColor"))) {

        sectionClasses.push("has-background");
    }

    return sectionClasses;
}

function addColumnClass(sectionClasses, section)
{
    if (!isEmpty(section, "columns")) {
        sectionClasses.push("builder-text-columns-"+section["columns"]);
    }

    if ('gallery' == section.type) {
        var galleryImageCount = section["images"].length;
        if (galleryImageCount > 4) {
            sectionClasses.push("builder-gallery-columns-4");
        } else {
            sectionClasses.push("builder-gallery-columns-"+galleryImageCount);
        }
    }

    return sectionClasses;
}

function addParallaxClass(sectionClasses, section)
{
    if (isTrue(section, "parallax")) {
        sectionClasses.push("parallax");
    }
    
    return sectionClasses;
}

function getSectionClasses(section)
{
    var sectionClasses = [];
    sectionClasses.push(commonClass, 'asset-type-'+section.type);

    sectionClasses = addFirstLastClass(sectionClasses);
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
    if (!isEmpty(section, "backgroundImage")) {

        sectionStyles.push("background-image: url('"+section["backgroundImage"]+"');");
        if (isTrue(section, "backgroundRepeat")) {
            sectionStyles.push("background-repeat:repeat;");
        } else {
            sectionStyles.push("background-size: cover;");
        }

        //temp. check
        if (isEmpty(section, "backgroundFade")) {
            section['backgroundFade'] = false;
        }
    }
    if (!isEmpty(section, "backgroundColor")) {
        sectionStyles.push("background-color:" + section["backgroundColor"]+";");
    }
    if (!isEmpty(section, "foregroundColor") && 'summary' !== section.type) {
        sectionStyles.push("color:" + section["foregroundColor"]+";");
    }

    if ('slider' === section.type) {
        sectionStyles.push('background-size: cover;');
    }

    return sectionStyles.join(' ');
}

function getExtraStyles(section)
{
    var extraStyles = [];
    if (!isEmpty(section, "foregroundColor") && 'summary' === section.type) {
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
    if ('richContent' != section.type && !isEmpty(section, 'text')) {
        section['text'] = marked(section['text']);
    }

    return section;
}

module.exports = {
    parse: parse,
    processRequest: processRequest,
    testRead: testRead
}