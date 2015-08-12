var fs = require('fs');
var _ = require("underscore");
var html = '';
var commonClass = 'builder-section';
var sectionsCovered = 0;

module.exports = {
    parse: parse
}

function parse(request, response)
{
    response.setHeader('content-type', 'text/html');
    var staticHTML = fs.readFileSync('./staticpage.html', 'utf8');
    var obj = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

    obj.sections.forEach(handleSection);

    html += getSocialSharingSection('builder-section-last');

    var pageTemplate = _.template(staticHTML);

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
    var bannerSection = fs.readFileSync('./banner.html', 'utf8');
    var bannerTemplate = _.template(bannerSection);

    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);

    var sectionHtml = bannerTemplate(
        { sectionClasses: sectionClasses, 
          sectionStyles:  sectionStyles,
          imageUrl: section["background-image"],
          bannerText: section["text"]
        }
    );

    return sectionHtml;
}

function getVideoBannerSection(section)
{
    var bannerSection = fs.readFileSync('./videoBanner.html', 'utf8');
    var bannerTemplate = _.template(bannerSection);

    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);

    var sectionHtml = bannerTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles:  sectionStyles,
            videoUrl: section["url"]
        }
    );

    return sectionHtml;
}

function getSingleColumnSection(section)
{
    var contentSection = fs.readFileSync('./singleColumn.html', 'utf8');
    var contentTemplate = _.template(contentSection);

    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);

    var sectionHtml = contentTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles:  sectionStyles,
            text: section["text"]
        }
    );

    return sectionHtml;
}

function getMutiColumnSection(section)
{
    var contentSection = fs.readFileSync('./multiColumn.html', 'utf8');
    var contentTemplate = _.template(contentSection);

    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);

    var sectionHtml = contentTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles:  sectionStyles,
            contentSections: section.sections
        }
    );

    return sectionHtml;
}

function getImageSection(section)
{
    var imageSection = fs.readFileSync('./image.html', 'utf8');
    var imageTemplate = _.template(imageSection);
    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);

    var sectionHtml = imageTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles:  sectionStyles,
            columnNo: 1,
            width: section.width,
            height: section.height,
            src: section.url,
            classes: section.class
        }
    );

    return sectionHtml;
}

function getGallerySection(section)
{
    var gallerySection = fs.readFileSync('./gallery.html', 'utf8');
    var galleryTemplate = _.template(gallerySection);
    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);

    var sectionHtml = galleryTemplate(
        { 
            sectionClasses: sectionClasses, 
            sectionStyles:  sectionStyles,
            gallerySections: section.sections
        }
    );

    return sectionHtml;
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
    var socialSharingSection = fs.readFileSync('./socialSharing.html', 'utf8');
    var socialSharingTemplate = _.template(socialSharingSection);

    var sectionHtml = socialSharingTemplate(
        { 
            lastSection: lastSection
        }
    );

    return sectionHtml;
}