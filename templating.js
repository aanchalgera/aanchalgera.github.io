'use strict';
var fs = require('fs'), 
    _ = require("underscore"), 
    bannerTemplate, 
    imageTemplate, 
    videoBannerTemplate, 
    videoTemplate, 
    singleColumnTemplate, 
    imageColumnTemplate, 
    sliderTemplate, 
    summaryTemplate, 
    galleryTemplate, 
    groupedTemplate,
    pageTemplate, 
    sectionClasses,
    sectionStyles,
    extraStyles,
    section,
    templatesDir = './templates', 
    cloudinaryPath = 'http://res.cloudinary.com/realarpit/image/upload';


function loadFile(filePath)
{
    return fs.readFileSync(templatesDir + '/' + filePath, 'utf8');
}

function getTemplate(filePath)
{
    return _.template(loadFile(filePath));
}

function setSectionClasses(classes)
{
    sectionClasses = classes;
}
function setSectionStyles(styles)
{
    sectionStyles = styles;
}
function setExtraStyles(styles)
{
    extraStyles = styles;
}

function setSection(sec)
{
    section = sec;
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
    if (undefined === imageTemplate) {
        imageTemplate = getTemplate('image.html');
    }
    if (undefined === sliderTemplate) {
        sliderTemplate = getTemplate('slider.html');
    }
    if (undefined === summaryTemplate) {
        summaryTemplate = getTemplate('summary.html');
    }
    if (undefined === galleryTemplate) {
        galleryTemplate = getTemplate('gallery.html');
    }
    if (undefined === pageTemplate) {
        pageTemplate = getTemplate('staticpage.html');
    }
    if (undefined === groupedTemplate) {
        groupedTemplate = getTemplate('grouped.html');
    }
}

function getBannerTemplate()
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

function getVideoBannerTemplate()
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

function getVideoTemplate()
{
    return videoTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            url: section['url'],
            height: section["height"],
            width: section["width"]
        }
    );
}

function getSingleColumnTemplate()
{
    return singleColumnTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            text: section["text"],
            title: section["title"],
            backgroundFade: section["backgroundFade"]
        }
    );
}

function getSummaryTemplate()
{
    return summaryTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            extraStyles: extraStyles,
            text: section["text"]
        }
    );
}

function getGalleryTemplate()
{
    return galleryTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            images: section['images']
        }
    );
}

function getImageTemplate(imageObject)
{
    return imageTemplate(imageObject);
}

function getSliderTemplate()
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

function getGroupedTemplate(sectionClasses, sectionStyles, columns)
{
    return groupedTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            contentSections: columns
        }
    );
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
    getSummaryTemplate: getSummaryTemplate,
    getGroupedTemplate: getGroupedTemplate,
    getImageTemplate: getImageTemplate,
    getSliderTemplate: getSliderTemplate,
    getGalleryTemplate: getGalleryTemplate,
    getPageTemplate: getPageTemplate,
    setSectionClasses: setSectionClasses,
    setSectionStyles: setSectionStyles,
    setExtraStyles: setExtraStyles,
    setSection: setSection,
    loadFile: loadFile,
    writeFile: writeFile,
    getTemplate: getTemplate
}
