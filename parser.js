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

function testRead()
{
    var testJson = templating.loadFile('test.json');
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
    if (undefined !== section['text'] && '' != section['text']) {
        section['text'] = section['text'].replace(/<p><br><\/p>/g, '');
        section['text'] = marked(section['text'].trim());
    }
    while (skipSections > 0) {
        skipSections--;
        return;
    }

    sectionClasses = getSectionClasses(section);
    sectionStyles = getSectionStyles(section);

    switch(section.type) {
        case 'banner':
            html += templating.getBannerTemplate(sectionClasses, sectionStyles, section);
            break;
        case 'video':
            if (undefined == section["align"] || "" == section["align"]) {
                html += templating.getVideoTemplate(sectionClasses, sectionStyles, section);
            } else {
                html += getMutiColumnSection(section, index, allSections);
            }
            break;
        case 'video_banner':
            html += templating.getVideoBannerTemplate(sectionClasses, sectionStyles, section);
            break;
        case 'slider':
            html += templating.getSliderTemplate(sectionClasses, sectionStyles, section);
            break;
        case 'image':
            if (true == section.banner) {
                html += templating.getBannerTemplate(sectionClasses, sectionStyles, section);
            } else {
                if (undefined == section["align"] || "" == section["align"]) {
                    html += templating.getImageTemplate(sectionClasses, sectionStyles, section);
                } else {
                    html += getMutiColumnSection(section, index, allSections);
                }
            }
            break;
        case 'content':
            if (undefined == section["align"] || "" == section["align"]) {
                html += templating.getSingleColumnTemplate(sectionClasses, sectionStyles, section);
            } else {
                html += getMutiColumnSection(section, index, allSections);
            }
            break;
    }
    sectionsCovered++;
}


function getMutiColumnSection(section, index, allSections)
{
    var totalColumns = 1;
    var columns = [];
    columns.push(section);
    skipSections = 0;

    var nextIndex = index + 1;
    var nextToNextIndex = index + 2;

    if ('section-align-left' === section.align) {
        if ('center' == allSections[nextIndex]["align"]) {
            skipSections++;
            totalColumns++;
            columns.push(allSections[nextIndex]);
            if ('section-align-right' == allSections[nextToNextIndex]["align"]) {
                skipSections++;
                totalColumns++;
                columns.push(allSections[nextToNextIndex]);
            }
        } else if ('section-align-right' == allSections[nextIndex]["align"]) {
            skipSections++;
            totalColumns++;
            columns.push(allSections[nextIndex]);
        }
    }

    sectionClasses += ' builder-text-columns-'+totalColumns;

    return templating.getMultiColumnTemplate(sectionClasses, sectionStyles, columns);
}

function getSectionClasses(section)
{
    var sectionClasses = [];
    sectionClasses.push('builder-section');
    if (0 === sectionsCovered) {
        sectionClasses.push("builder-section-first");
    } else if (sectionsCovered === totalSections - 1) {
        sectionClasses.push("builder-section-last");
    }
    if (true == section.banner) {
        sectionClasses.push("builder-section-banner");
    } else if ('image' == section.type && false == section.banner) {
        sectionClasses.push("builder-section-text");
    } else if ('content' == section.type) {
        sectionClasses.push("builder-section-text");
    } else if ('slider' == section.type) {
        sectionClasses.push("builder-section-banner");
    }

    if ('banner' != section.type 
        && (
               (undefined !== section["backgroundImage"] && '' != section["backgroundImage"])
            || (undefined !==  section["backgroundColor"] && '' != section["backgroundColor"])
         )
        )
    {
        sectionClasses.push("has-background");
    }

    if (undefined !== section["columns"] && '' != section["columns"]) {
        sectionClasses.push("builder-text-columns-"+section["columns"]);
    }

    if (undefined !== section["parallax"] && '' != section["parallax"]) {
        sectionClasses.push("parallax");
    }

    return sectionClasses.join(' ');
}

function getSectionStyles(section)
{
    var sectionStyles = [];
    if ('banner' != section.type) {
        if (undefined !==  section["backgroundImage"] && '' != section["backgroundImage"]) {
            sectionStyles.push("background-image: url('"+section["backgroundImage"]+"');");
            if (undefined !==  section["backgroundCover"] && true === section["backgroundCover"]) {
                sectionStyles.push("background-size: cover;");
            } else {
                if (undefined !==  section["backgroundRepeat"]) {
                    if (true ===  section["backgroundRepeat"]) {
                        sectionStyles.push("background-repeat:repeat;");
                    } else {
                        sectionStyles.push("background-repeat:no-repeat;");
                    }
                } else { //temp code
                    sectionStyles.push("background-repeat:repeat;");
                }
            }
        }
        if (undefined !==  section["backgroundColor"] && '' != section["backgroundColor"]) {
            sectionStyles.push("background-color:" + section["backgroundColor"]);
        }
    }

    if ('slider' === section.type) {
        sectionStyles.push('background-size: cover;');
    }

    return sectionStyles.join(' ');
}

module.exports = {
    parse: parse,
    processRequest: processRequest,
    testRead: testRead
}