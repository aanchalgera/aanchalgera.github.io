var fs = require('fs');
var _ = require("underscore");

var html;
var commonClass = 'builder-section';
var sectionsCovered;
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
    if('/output' == request.url) {
        fs.readFile('./output.html',function(err,data) {
            response.end(data);
        });
    } else if('/parse' == request.url) {
        html = '';
        sectionsCovered = 0;
        response.setHeader('content-type', 'text/html');
        var pageTemplate = getTemplate('./staticpage.html');

        var requestData = '';
        request.on('data', function (data) {
            requestData = data;
        });
        request.on('end', function () {
            response.writeHead(200);
            var jsonObjects = JSON.parse(requestData);
            setup(); //initialize all templates to prevent multiple times file i/o
            jsonObjects.sections.forEach(handleSection);

            html += getSocialSharingSection('builder-section-last');

            var finalHTML = pageTemplate(
                { 
                  pageTitle: jsonObjects.page_title,
                  sectionsHTML: html
                }
            );

            fs.writeFileSync('./output.html', finalHTML, "UTF-8", {'flags': 'w+'});
                response.write('');
                response.end();
            
          });
    }
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