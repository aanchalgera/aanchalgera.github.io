'use strict';
var marked = require('marked');
var templating = require('./templating.js');

var html;
var commonClass = 'builder-section';
var sectionsCovered;
var sectionClasses;
var sectionStyles;
var skipSections = 0;
var outputFilePath = './jseditor/public/posts';
var relativeFilePath = 'posts';
var totalSections;
var jsonObjects;
var templating;

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

    if (isEmpty(section, 'align')) {
        switch(section.type) {
            case 'video':
                html += templating.getVideoTemplate(sectionClasses, sectionStyles, section);
                break;
            case 'video_banner':
                html += templating.getVideoBannerTemplate(sectionClasses, sectionStyles, section);
                break;
            case 'slider':
                html += templating.getSliderTemplate(sectionClasses, sectionStyles, section);
                break;
            case 'summary':
                html += templating.getSummaryTemplate(sectionClasses, sectionStyles, section);
                break;
            case 'gallery':
                html += templating.getGalleryTemplate(sectionClasses, sectionStyles, section);
                break;
            case 'richContent':
                html += templating.getRichContentTemplate(sectionClasses, sectionStyles, section);
                break;
            case 'image':
                if (true == section.banner) {
                    html += templating.getBannerTemplate(sectionClasses, sectionStyles, section);
                } else {
                    var imageObject = getImageObject(sectionClasses, sectionStyles, section);
                    html += templating.getImageTemplate(imageObject);
                }
                break;
            case 'content':
                html += templating.getSingleColumnTemplate(sectionClasses, sectionStyles, section);
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

    return templating.getMultiColumnTemplate(sectionClasses, sectionStyles, columns);
}

function getImageObject(sectionClasses, sectionStyles, section)
{
    var cloudinaryPath = 'http://res.cloudinary.com/realarpit/image/upload';

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

    sectionClasses.push('asset-type-'+section.type);

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
            sectionClasses.push('builder-section-gallery');
            sectionClasses.push('builder-gallery-captions-reveal');
            sectionClasses.push('builder-gallery-captions-dark');
            sectionClasses.push('builder-gallery-aspect-landscape');
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
        sectionClasses.push("builder-gallery-columns-"+section["images"].length);
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
    sectionClasses.push(commonClass);

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
    if (!isEmpty(section, "foregroundColor")) {
        sectionStyles.push("color:" + section["foregroundColor"]+";");
    }

    if ('slider' === section.type) {
        sectionStyles.push('background-size: cover;');
    }

    return sectionStyles.join(' ');
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