var fs = require('fs');
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

    html += getSocialSharingSection(true);
    staticHTML = staticHTML.replace('##SECTIONS_CONTENT##', html);

    response.write(staticHTML);
    response.end(); 

}

function startSection(section)
{
    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);
    var sectionHtml = "<section class=\""+sectionClasses + "\" style=\""+sectionStyles + "\">";

    return sectionHtml;
}

function handleSection(section)
{
    sectionType = section.type;
    html += "\n\n";

    if (1 == sectionsCovered) {
        html += getSocialSharingSection(false);
        html += "\n\n";
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
    return  startSection(section)
                + startSectionContent()
                    + startBanner(section["background-image"])
                        + startBannerContent()
                            + startBannerInnerContent()
                                + getBannerText(section["text"])
                            + end()
                        + end()
                    + end()
                + end()
            + endSection()
    ;
}

function getVideoBannerSection(section)
{
    return  startSection(section)
                + startSectionContent()
                    + startBanner()
                        + startBannerContent()
                            + startBannerInnerContent()
                                + getBannerVideo(section["url"])
                            + end()
                        + end()
                    + end()
                + end()
            + endSection()
    ;
}

function getSingleColumnSection(section)
{
    var columnNo = 1;
    return  startSection(section)
                + startSectionContent()
                    + startTextColumn(columnNo)
                        + startTextContent()
                            + section["text"]
                        + end()
                    + end()
                + end()
            + endSection()
    ;
}

function getMutiColumnSection(section)
{
    var columnCounter = 0;
    var contentSections = section.sections;
    var sectionHtml = '';

    sectionHtml = startSection(section) + startSectionContent();

    contentSections.forEach(
        function(contentSection) {
            columnCounter++;
            sectionHtml += startTextColumn(columnCounter);
            if ('image' === contentSection.type) {
                sectionHtml += startFigure() + getImageTag(contentSection) +  endFigure();
            } else if ('content' === contentSection.type) {
                sectionHtml += startTextContent();
                if ('' != contentSection.text) {
                    sectionHtml += contentSection.text;
                }
                sectionHtml += end(); //end of text content
            }
            sectionHtml += end(); //end of text column
        }
    );

    sectionHtml += end(); //end of section content
    sectionHtml += endSection();

    return sectionHtml;
}

function getImageSection(section)
{
    var columnNo = 1;
    return  startSection(section)
                + startSectionContent()
                    + startTextColumn(columnNo)
                        + startTextContent()
                            + getImageTag(section)
                        + end()
                    + end()
                + end()
            + endSection()
    ;
}

function getGallerySection(section)
{
    var sectionHtml = startSection(section) + startSectionContent();

    var gallerySections = section.sections;

    gallerySections.forEach(
        function(gallerySection) {
            if ('figure' === gallerySection.type) {
                sectionHtml += 
                    startGalleryItem()
                        + startGalleryFigure(gallerySection["background-image"])
                        + endFigure()
                        + startGalleryContent()
                            + startGalleryContentInner()
                                + startGalleryDescription()
                                    + gallerySection.description
                                + end()
                            + end()
                        + end()
                    + end;
            }
        }
    );
    sectionHtml += endSection();

    return sectionHtml;
}

////////////////////// HTML FUNCTIONS //////////////////////

function startGalleryItem()
{
    return '<div class="builder-gallery-item" onclick="return false;">';
}

function startGalleryFigure(backgroundImage)
{
    return '<figure class="builder-gallery-image" style="background-image: url(&#039;'+backgroundImage+'&#039;);"></figure>';
}

function startGalleryContent()
{
   return '<div class="builder-gallery-content">'; 
}

function startGalleryContentInner()
{
   return '<div class="builder-gallery-content-inner">'; 
}

function startGalleryDescription()
{
   return '<div class="builder-gallery-content-description">'; 
}

function getImageTag(section)
{
    return '<img width="'+section.width+'" height="'+section.height+'" src="'+section.url+'" class="'+section.class+'">';
}


function end()
{
    return '</div>';
}

function startFigure()
{
    return '<figure class="builder-text-image">';
}

function endFigure()
{
    return '</figure>';
}

function startTextColumn(columnNo)
{
    return '<div class="builder-text-column builder-text-column-'+columnNo+'">';
}

function startTextContent()
{
    return '<div class="builder-text-content">';
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
    var socialSharingHtml = '<section id="builder-section-1437038488821" class="builder-section builder-section-prev-banner builder-section-text builder-section-next-text builder-text-columns-1"';
    if (true === lastSection) {
        socialSharingHtml += ' builder-section-last';
    }

    socialSharingHtml += 'style=""> \
                <div class="builder-section-content"> \
                    <div class="builder-text-column builder-text-column-1" id="builder-section-1437038488821-column-1"> \
                        <div class="builder-text-content"> \
                            <p>Comparte <span class="ttfmake-icon mceNonEditable fa"><a class="socialmedia" href="http://facebook.com/sharer/sharer.php?locale=es_ES&amp;app_id=257021759969&amp;redirect_uri=hhttp://www.xataka.com/especial/videojuegos-ochenta-dosmildieciseis&amp;u=http://www.xataka.com/especial/videojuegos-ochenta-dosmildieciseis" target="_blank"></a></span> <span class="ttfmake-icon mceNonEditable fa"><a class="socialmedia" href="https://twitter.com/intent/tweet?url=http://www.xataka.com/especial/videojuegos-ochenta-dosmildieciseis&amp;text=Jugar%20a%20videojuegos%20en%20los%2080%20vs.%20jugar%20en%202016&amp;via=xataka" target="_blank"></a></span> <span class="ttfmake-icon mceNonEditable fa"><a class="socialmedia" href="https://plus.google.com/share?url=http://www.xataka.com/especial/videojuegos-ochenta-dosmildieciseis" target="_blank"></a></span> <span class="ttfmake-icon mceNonEditable fa"><a class="socialmedia" href="mailto:?to=&amp;subject=Jugar a videojuegos en los 80 vs. jugar en 2016 por Xataka&amp;body=http://www.xataka.com/especial/videojuegos-ochenta-dosmildieciseis" target="_blank"></a></span></p> \
                            <hr class="ttfmake-hr" style="border-style: solid; border-top-width: 1px;" /> \
                        </div> \
                    </div> \
                </div> \
            </section>';

    return socialSharingHtml;
}

function startSectionContent()
{
    return '<div class="builder-section-content">';
}

function startBanner(imageUrl)
{
    if (undefined === imageUrl || '' === imageUrl) {
        return "<div class=\"builder-banner-slide builder-banner-slide-62 content-position-none\" style=''>";
    }

    return "<div class=\"builder-banner-slide builder-banner-slide-500_750 content-position-none\" style=\"background-image: url(&#039;"+imageUrl+"&#039;);\">";
}

function startBannerContent()
{
    return '<div class="builder-banner-content">';
}

function startBannerInnerContent()
{
    return '<div class="builder-banner-inner-content" style="text-align:center;">';
}

function endSection()
{
    return '</section>';
}

function getBannerText(bannerText)
{
    if (undefined === bannerText || '' === bannerText) {
        return '';
    }

    return bannerText;
}

function getBannerVideo(videoUrl)
{
    return '<iframe width="1280" height="720" src="'+videoUrl+'" frameborder=\"0\" allowfullscreen></iframe>';
}