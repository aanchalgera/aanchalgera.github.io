var fs = require('fs');
var _ = require("underscore");
var markdown = require("markdown").markdown;

var html;
var commonClass = 'builder-section';
var sectionsCovered;
var pageTemplate;
var sectionObjects;

var bannerTemplate;
var videoBannerTemplate;
var videoTemplate;
var singleColumnTemplate;
var multiColumnTemplate;
var imageColumnTemplate;
var sliderTemplate;

var sectionClasses;
var sectionStyles;

var skipSections = 0;
var outputFilePath = 'jseditor/public/posts';
var relativeFilePath = 'posts';

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
    videoTemplate = getTemplate('./video.html');
    singleColumnTemplate = getTemplate('./singleColumn.html');
    multiColumnTemplate = getTemplate('./multiColumn.html');
    imageTemplate = getTemplate('./image.html');
    sliderTemplate = getTemplate('./slider.html');
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
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.writeHead(200);
            var jsonObjects = JSON.parse(requestData);
            setup(); //initialize all templates to prevent multiple times file i/o
            jsonObjects.sections.forEach(handleSection);

            html += getSocialSharingSection('builder-section-last');

            var finalHTML = pageTemplate(
                { 
                  pageTitle: jsonObjects.page_title,
                  pageDescription: jsonObjects.page_description,
                  sectionsHTML: html
                }
            );

            var outputFileName = '';
            if (undefined !== jsonObjects.id && '' != jsonObjects.id) {
                outputFileName = jsonObjects.id + '.html';
            } else {
                outputFileName = new Date().getTime()+ '.html';
            }
            fs.writeFileSync(outputFilePath + '/' + outputFileName, finalHTML, "UTF-8", {'flags': 'w+'});
            response.write(finalHTML);
            response.end();
          });
    } else if ('/' == request.url) {
        html = '';
        var jsonObjects = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
        setup(); //initialize all templates to prevent multiple times file i/o
        jsonObjects.sections.forEach(handleSection);
        var pageTemplate = getTemplate('./staticpage.html');

        var finalHTML = pageTemplate(
            { 
              sectionsHTML: html
            }
        );
       var fileName = '';
        if (undefined !== jsonObjects.id && '' != jsonObjects.id) {
            fileName = jsonObjects.id + '.html';
        } else {
            fileName = new Date().getTime()+ '.html';
        }
        fs.writeFileSync(fileName, finalHTML, "UTF-8", {'flags': 'w+'});
        response.write(finalHTML);
        response.end();
    }
}

function handleSection(section, index, allSections)
{
    if (undefined !== section['text'] && '' != section['text']) {
        section['text'] = markdown.toHTML(section['text']);
    }
    while (skipSections > 0) {
        skipSections--;
        return;
    }
    sectionType = section.type;
    html += "\n";

    sectionClasses = getSectionClasses(section);
    sectionStyles = getSectionStyles(section);

    switch(section.type) {
        case 'banner':
            html += getBannerSection(section);
            break;
        case 'video':
            html += getVideoSection(section);
            break;
        case 'video_banner':
            html += getVideoBannerSection(section);
            break;
        case 'slider':
            html += getSliderBannerSection(section);
            break;
        case 'image':
            if (true == section.banner) {
                html += getBannerSection(section);
            } else {
                html += getImageSection(section);
            }
            break;
        case 'content':
            if (undefined == section["align"]) {
                html += getSingleColumnSection(section);
            } else {
                html += getMutiColumnSection(section, index, allSections);
            }
            break;
    }
    sectionsCovered++;
}

function getVideoSection(section)
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

function getSliderBannerSection(section)
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

function getBannerSection(section)
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

function getVideoBannerSection(section)
{
    return videoBannerTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            videoUrl: section["url"],
            height: section["height"],
            width: section["width"],
            bannerHeight: section["banner-height"]
        }
    );
}

function getSingleColumnSection(section)
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

function getMutiColumnSection(section, index, allSections)
{
    var totalColumns = 1;
    var columns = [];
    columns.push(section);
    skipSections = 0;

    var nextIndex = index + 1;
    var nextToNextIndex = index + 2;

    if ('left' === section.align) {
        if ('center' == allSections[nextIndex]["align"]) {
            skipSections++;
            totalColumns++;
            columns.push(allSections[nextIndex]);
            if ('right' == allSections[nextToNextIndex]["align"]) {
                skipSections++;
                totalColumns++;
                columns.push(allSections[nextToNextIndex]);
            }
        } else if ('right' == allSections[nextIndex]["align"]) {
            skipSections++;
            totalColumns++;
            columns.push(allSections[nextIndex]);
        }
    }

    sectionClasses += ' builder-text-columns-'+totalColumns;

    return multiColumnTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles: sectionStyles,
            contentSections: columns
        }
    );
}

function getImageSection(section)
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

function getSectionClasses(section)
{
    var sectionClasses = [];
    sectionClasses.push('builder-section');
    if (0 === sectionsCovered) {
        sectionClasses.push("builder-section-first");
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
               (undefined !== section["background-image"] && '' != section["background-image"])
            || (undefined !==  section["background-color"] && '' != section["background-color"])
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
        if (undefined !==  section["background-color"] && '' != section["background-color"]) {
            sectionStyles.push("background-color:" + section["background-color"]);
        }
        if (undefined !==  section["background-image"] && '' != section["background-image"]) {
            sectionStyles.push("background-image: url('"+section["background-image"]+"');background-size: cover;");
        }
    }

    if ('slider' === section.type) {
        sectionStyles.push('background-size: cover;');
    }

    return sectionStyles.join(' ');
}

function getSocialSharingSection(lastSection)
{
    var socialSharingTemplate = getTemplate('./socialSharing.html');
    return socialSharingTemplate({ lastSection: lastSection });
}