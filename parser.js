var fs = require('fs');
var html = '';
var commonClass = 'builder-section';
var totalSections = 0;
var sectionsCovered = 0;

module.exports = {
    parse: parse
}

function parse(request, response)
{
    response.setHeader('content-type', 'text/html');
    var staticHTML = fs.readFileSync('./staticpage.html', 'utf8');
    var obj = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

    totalSections = obj.sections.length;
    obj.sections.forEach(handleSection);

    html += getSocialSharingSection(true);
    staticHTML = staticHTML.replace('##SECTIONS_CONTENT##', html);

    response.write(staticHTML);
    response.end(); 

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
        case 'video':
            html += getVideoSection(section);
            break;
    }
    sectionsCovered++;
}

function getBannerSection(section)
{
    var sectionHtml = startSection(section);
    
    sectionHtml += getBanner(section["background-image"], section["text"]);
    sectionHtml += "</section>";

    return sectionHtml;
}

function getImageSection(section)
{
    var sectionHtml = startSection(section);

    sectionHtml += getImage(section);
    sectionHtml += '</section>';
   
    return sectionHtml;
}

function getImage(section)
{
    var sectionHtml = '<div class="builder-section-content">';
    var imageTag = getImageTag(section);
    sectionHtml += getText(imageTag);
    sectionHtml += '</div>';

    return sectionHtml;
}

function getImageTag(section)
{
    return '<img width="'+section.width+'" height="'+section.height+'" src="'+section.url+'" class="'+section.class+'">';
}

function getGallerySection(section)
{
    var sectionHtml = startSection(section);


    sectionHtml += '<div class="builder-section-content">';

    var gallerySections = section.sections;
    gallerySections.forEach(
        function(gallerySection) {
            if ('figure' === gallerySection.type) {
                sectionHtml += '<div class="builder-gallery-item" onclick="return false;">';
                sectionHtml += '<figure class="builder-gallery-image" style="background-image: url(&#039;'+gallerySection["background-image"]+'&#039;);"></figure> \
                            <div class="builder-gallery-content"> \
                            <div class="builder-gallery-content-inner"> \
                            <div class="builder-gallery-description"> \
                            ' + gallerySection.description + ' \
                            </div> \
                            </div> \
                            </div>';
                sectionHtml += '</div>';
            }
        }
    );
    sectionHtml += "</section>";

    return sectionHtml;
}

function getMutiColumnSection(section)
{
    var sectionHtml = startSection(section);
    
    var contentSections = section.sections;
    sectionHtml += '<div class="builder-section-content">';
    sectionText = '';
    contentSections.forEach(
        function(contentSection) {
            sectionHtml += '<div class="builder-text-column">';
            sectionHtml += '<div class="builder-text-content">';
            if ('image' === contentSection.type) {
                var imageTag = getImageTag(contentSection);
                sectionHtml += imageTag;
            } else if ('content' === contentSection.type) {
                if ('' != contentSection["background-image"]) {
                    sectionHtml += getBackgroundImage(contentSection["background-image"]);
                }
                if ('' != contentSection.text) {
                    sectionHtml += getText(contentSection.text);
                }
            }
            sectionHtml += "</div></div>";
        }
    );

    sectionHtml += "</div>";
    sectionHtml += "</section>";

    return sectionHtml;
}

function getSingleColumnSection(section)
{
    var sectionHtml = startSection(section);

    if ('' != section["background-image"]) {
        sectionHtml += getBackgroundImage(section["background-image"]);
    }
    if ('' != section.text) {
        sectionHtml += '<div class="builder-section-content">'
        sectionHtml += getText(section.text);
        sectionHtml += '</div>';
    }
    sectionHtml += '</section>';

    return sectionHtml;
}

function getVideoSection(section)
{
    var sectionHtml = startSection(section);

    sectionHtml += '<div class="builder-section-content"> \
               <iframe width="1280" height="720" src="'+section.url+'" frameborder=\"0\" allowfullscreen></iframe> \
             </div> \
            </section>';
    
    return sectionHtml;
}
    
function getBackgroundImage(imageUrl)
{
    var imageHtml = '<div class="builder-section-content">';
    imageHtml += "<div class=\"builder-banner-slide content-position-none\" style=\"background-image: url('"+imageUrl+"');\">";
    imageHtml += '</div>';

    return imageHtml;
}

function getText(text) {
    return '<div class="builder-text-column"><div class="builder-text-content">' + text + '</div></div>';
}

function getBanner(imageUrl, bannerText)
{
    var bannerHtml = '<div class="builder-section-content">';
    bannerHtml += '<div class="builder-banner-slide builder-banner-slide-500_750 content-position-none" style="background-image: url(&#039;'+imageUrl+'&#039;);">';
    bannerHtml += '<div class="builder-banner-content">';
    bannerHtml += '<div class="builder-banner-inner-content">';
    if (undefined !== bannerText && '' !== bannerText) {
        bannerHtml += bannerText;
    }
    bannerHtml += '</div>';
    bannerHtml += '</div>';
    bannerHtml += '</div>';
    bannerHtml += '</div>';

    return bannerHtml;

}

function getSectionClasses(section)
{
    var sectionClasses = [];
    sectionClasses.push('builder-section');
    if (0 === sectionsCovered) {
        sectionClasses.push("builder-section-first");
    }
    if ('banner' == section.type) {
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

function startSection(section)
{
    var sectionClasses = getSectionClasses(section);
    var sectionStyles = getSectionStyles(section);
    var sectionHtml = "<section class=\""+sectionClasses + "\" style=\""+sectionStyles + "\">";

    return sectionHtml;
}