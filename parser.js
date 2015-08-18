var fs = require('fs');
var _ = require("underscore");

var html = '';
var commonClass = 'builder-section';
var sectionsCovered = 0;
var pageTemplate;
var sectionObjects;

var bannerTemplate;
var videoBannerTemplate;
var singleColumnTemplate;
var multiColumnTemplate;
var imageColumnTemplate;
var galleryColumnTemplate;

var sectionClasses;
var sectionStyles;

module.exports = {
    parse: parse
}

function getTemplate(filePath)
{
    return _.template(fs.readFileSync(filePath, 'utf8'));
}

function setup()
{
    bannerTemplate = getTemplate('./banner.html');
    videoBannerTemplate = getTemplate('./videoBanner.html');
    singleColumnTemplate = getTemplate('./singleColumn.html');
    multiColumnTemplate = getTemplate('./multiColumn.html');
    imageTemplate = getTemplate('./image.html');
    galleryTemplate = getTemplate('./gallery.html');
}

function parse(request, response)
{
    response.setHeader('content-type', 'text/html');
    var pageTemplate = getTemplate('./staticpage.html');
    var sectionObjects = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

    setup(); //initialize all templates to prevent multiple times file i/o
    sectionObjects.sections.forEach(handleSection);

    html += getSocialSharingSection('builder-section-last');

    var finalHTML = pageTemplate(
        { 
          sectionsHTML: html
        }
    );

    response.write(finalHTML);
    response.end();
}

function handleSection(section)
{
    sectionType = section.type;
    html += "\n";

    if (1 == sectionsCovered) {
        html += getSocialSharingSection('');
        html += "\n";
    }

    sectionClasses = getSectionClasses(section);
    sectionStyles = getSectionStyles(section);

    switch(section.type) {
        case 'banner':
            html += getBannerSection(section);
            break;
        case 'video_banner':
            html += getVideoBannerSection(section);
            break;
        case 'image':
            html += getImageSection(section);
            break;
        case 'gallery':
            html += getGallerySection(section);
            break;
        case 'content':
            if (1 == section.columns) {
                html += getSingleColumnSection(section);
            } else if (section.columns > 1) { 
                html += getMutiColumnSection(section);
            }
            break;
    }
    sectionsCovered++;
}

function getBannerSection(section)
{
    return bannerTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            imageUrl: section["background-image"],
            bannerText: section["text"]
        }
    );
}

function getVideoBannerSection(section)
{
    return videoBannerTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            videoUrl: section["url"]
        }
    );
}

function getSingleColumnSection(section)
{
    return singleColumnTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            text: section["text"]
        }
    );
}

function getMutiColumnSection(section)
{
    return multiColumnTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            contentSections: section.sections
        }
    );
}

function getImageSection(section)
{
    return imageTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            columnNo: 1,
            width: section.width,
            height: section.height,
            src: section.url,
            classes: section.class
        }
    );
}

function getGallerySection(section)
{
    return galleryTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            gallerySections: section.sections
        }
    );
}

function getSectionClasses(section)
{
    var sectionClasses = [];
    sectionClasses.push('builder-section');
    if (0 === sectionsCovered) {
        sectionClasses.push("builder-section-first");
    }
    if ('banner' == section.type || 'video_banner' == section.type) {
        sectionClasses.push("builder-section-banner");
    } else if ('image' == section.type) {
        sectionClasses.push("builder-section-text");
    } else if ('content' == section.type) {
        sectionClasses.push("builder-section-text");
    }

    if ('banner' != section.type 
        && (
               (undefined !== section["background-image"] && '' != section["background-image"])
            || (undefined !==  section["background-color"] && '' != section["background-color"])
         )
        )
    {
        sectionClasses.push("has-background");
    }

    if ('gallery' == section.type) {
        sectionClasses.push("builder-section-gallery");
        if (undefined !== section["columns"] && '' != section["columns"]) {
            sectionClasses.push("builder-gallery-columns-"+section["columns"]);
        }
        sectionClasses.push("builder-gallery-captions-reveal");
        sectionClasses.push("builder-gallery-captions-dark");
        sectionClasses.push("builder-gallery-aspect-landscape");
          
    } else {
        if (undefined !== section["columns"] && '' != section["columns"]) {
            sectionClasses.push("builder-text-columns-"+section["columns"]);
        }
    }

    if (undefined !== section["parallax"] && '' != section["parallax"]) {
        sectionClasses.push("parallax");
    }

    return sectionClasses.join(' ');
}

function getSectionStyles(section)
{
    if ('banner' != section.type) {
        if (undefined !==  section["background-color"] && '' != section["background-color"]) {
            return "background-color:" + section["background-color"];
        }
        if (undefined !==  section["background-image"] && '' != section["background-image"]) {
            return "background-image: url('"+section["background-image"]+"');";
        }
    }

    return '';
}

function getSocialSharingSection(lastSection)
{
    var socialSharingTemplate = getTemplate('./socialSharing.html');
    return socialSharingTemplate({ lastSection: lastSection });
}