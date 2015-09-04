'use strict';
var fs = require('fs');
var _ = require("underscore");
var bannerTemplate;
var imageTemplate;
var videoBannerTemplate;
var videoTemplate;
var singleColumnTemplate;
var multiColumnTemplate;
var imageColumnTemplate;
var sliderTemplate;
var pageTemplate;
var templatesDir = './templates';


function loadFile(filePath)
{
    return fs.readFileSync(templatesDir + '/' + filePath, 'utf8');
}

function getTemplate(filePath)
{
    return _.template(loadFile(filePath));
}

//template caching
function loadTemplates()
{
    if (undefined === bannerTemplate) {
        bannerTemplate = getTemplate('banner.html');
    }
    if (undefined === videoBannerTemplate) {
        videoBannerTemplate = getTemplate('videoBanner.html');
    }
    if (undefined === videoTemplate) {
        videoTemplate = getTemplate('video.html');
    }
    if (undefined === singleColumnTemplate) {
        singleColumnTemplate = getTemplate('singleColumn.html');
    }
    if (undefined === multiColumnTemplate) {
        multiColumnTemplate = getTemplate('multiColumn.html');
    }
    if (undefined === imageTemplate) {
        imageTemplate = getTemplate('image.html');
    }
    if (undefined === sliderTemplate) {
        sliderTemplate = getTemplate('slider.html');
    }
    if (undefined === pageTemplate) {
        pageTemplate = getTemplate('staticpage.html');
    }
}

function getBannerTemplate(sectionClasses, sectionStyles, section)
{
    return bannerTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            imageUrl: section["url"],
            bannerText: section["text"],
            height: section["height"]
        }
    );
}

function getVideoBannerTemplate(sectionClasses, sectionStyles, section)
{
    return videoBannerTemplate(
        {
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            videoUrl: section['url'],
            height: section["height"],
            width: section["width"],
            bannerHeight: section['bannerHeight']
        }
    );
}

function getVideoTemplate(sectionClasses, sectionStyles, section)
{
    return videoTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            videoUrl: section['url'],
            height: section["height"],
            width: section["width"]
        }
    );
}

function getSingleColumnTemplate(sectionClasses, sectionStyles, section)
{
    return singleColumnTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            text: section["text"],
            title: section["title"]
        }
    );
}

function getMultiColumnTemplate(sectionClasses, sectionStyles, columns)
{
    return multiColumnTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            contentSections: columns
        }
    );
}

function getImageTemplate(sectionClasses, sectionStyles, section)
{
    return imageTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            width: section.width,
            height: section.height,
            src: section.url,
            classes: section.class,
            alt: section
        }
    );
}

function getSliderTemplate(sectionClasses, sectionStyles, section)
{
    return sliderTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            title: section['title'],
            images: section['images']
        }
    );
}

function getPageTemplate(pageTitle, pageDescription, html)
{
    return pageTemplate(
        { 
          title: pageTitle,
          pageDescription: pageDescription,
          sectionsHTML: html
        }
    );
}

function processData(host)
{
    var testForm = getTemplate('testForm.html');
    var testJson = loadFile('test.json');

    var testHTML = testForm(
        {
          testData: testJson,
          host: host
        }
    );

    return testHTML;
}

function writeFile(fileName, fileContents)
{
    fs.writeFileSync(fileName, fileContents, "UTF-8", {'flags': 'w+'});    
}

module.exports = {
    loadTemplates: loadTemplates,
    getBannerTemplate: getBannerTemplate,
    getVideoBannerTemplate: getVideoBannerTemplate,
    getVideoTemplate: getVideoTemplate,
    getSingleColumnTemplate: getSingleColumnTemplate,
    getMultiColumnTemplate: getMultiColumnTemplate,
    getImageTemplate: getImageTemplate,
    getSliderTemplate: getSliderTemplate,
    getPageTemplate: getPageTemplate,
    loadFile: loadFile,
    writeFile: writeFile,
    getTemplate: getTemplate,
    processData: processData
}
