'use strict';
var fs = require('fs'), 
    _ = require("underscore"), 
    bannerTemplate, 
    imageTemplate, 
    videoTemplate, 
    imageColumnTemplate, 
    sliderTemplate, 
    galleryTemplate, 
    groupedTemplate,
    contentTemplate,
    commonTemplate,
    pageTemplate, 
    sectionClasses,
    sectionStyles,
    section,
    templatesDir = __dirname + '/templates';


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
    if (undefined === videoTemplate) {
        videoTemplate = getTemplate('video.html');
    }
    if (undefined === imageTemplate) {
        imageTemplate = getTemplate('image.html');
    }
    if (undefined === sliderTemplate) {
        sliderTemplate = getTemplate('slider.html');
    }
    if (undefined === galleryTemplate) {
        galleryTemplate = getTemplate('gallery.html');
    }
    if (undefined === pageTemplate) {
        pageTemplate = getTemplate('staticpage.html');
    }
    if (undefined === contentTemplate) {
        contentTemplate = getTemplate('content.html');
    }
    if (undefined === groupedTemplate) {
        groupedTemplate = getTemplate('grouped.html');
    }
    if (undefined === commonTemplate) {
        commonTemplate = getTemplate('common.html');
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

function getCommonTemplate()
{
    return commonTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
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
            images: section['images'],
            autoplay: section['autoplay']
        }
    );
}

function getContentTemplate(firstSectionHTML, html)
{
    return contentTemplate(
        { 
          firstSectionHTML: firstSectionHTML,
          sectionsHTML: html
        }
    );
}

function getPageTemplate(pageTitle, pageDescription, contentHTML)
{
    return pageTemplate(
        { 
          title: pageTitle,
          pageDescription: pageDescription,
          contentHTML: contentHTML
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
    getVideoTemplate: getVideoTemplate,
    getGroupedTemplate: getGroupedTemplate,
    getImageTemplate: getImageTemplate,
    getSliderTemplate: getSliderTemplate,
    getGalleryTemplate: getGalleryTemplate,
    getPageTemplate: getPageTemplate,
    getCommonTemplate: getCommonTemplate,
    getContentTemplate: getContentTemplate,
    setSectionClasses: setSectionClasses,
    setSectionStyles: setSectionStyles,
    setSection: setSection,
    loadFile: loadFile,
    writeFile: writeFile,
    getTemplate: getTemplate,
    processData: processData
}
