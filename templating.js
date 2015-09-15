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
var cloudinaryPath = 'http://res.cloudinary.com/realarpit/image/upload';


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
    var imageName = section['url'].substring(section['url'].lastIndexOf('/')+1);
    var imagePath450 = cloudinaryPath + '/w_450,c_fit/' + imageName;
    var imagePath650 = cloudinaryPath + '/w_650,c_fit/' + imageName;
    var imagePath1024 = cloudinaryPath + '/w_1024,c_fit/' + imageName;
    var imagePath1366 = cloudinaryPath + '/w_1366,c_fit/' + imageName;
    var imagePath2560 = cloudinaryPath + '/w_2560,c_fit/' + imageName;

    var imageTemplateObject = {
        sectionClasses: sectionClasses, 
        sectionStyles: sectionStyles,
        width: section.width,
        height: section.height,
        imagePath450 : imagePath450,
        src: section.url,
        classes: section.class,
        alt: section.alt,
        layout: section.layout
    };
    
    switch (section.layout) {
        case 'small':
            //no srcsets for small layout
            break;
        case 'normal':
            imageTemplateObject.imagePath650 = imagePath650;
            break;
        case 'big':
            imageTemplateObject.imagePath650 = imagePath650;
            imageTemplateObject.imagePath1024 = imagePath1024;
            imageTemplateObject.imagePath1366 = imagePath1366;
            break;
        case 'cover':
            imageTemplateObject.imagePath650 = imagePath650;
            imageTemplateObject.imagePath1024 = imagePath1024;
            imageTemplateObject.imagePath1366 = imagePath1366;
            imageTemplateObject.imagePath2560 = imagePath2560;
            break;
    }

    return imageTemplate(imageTemplateObject);
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
