var fs = require('fs');

module.exports = {
    parse: parse,
    embedBackgroundImage: embedBackgroundImage,
    embedText: embedText,
    embedBanner: embedBanner
}

function parse(request, response)
{

    response.setHeader('content-type', 'text/html');
    var staticHTML = fs.readFileSync('./staticpage.html', 'utf8');
    var obj = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

    var html = '';
    var commonClass = 'builder-section';
    var isFirstSection = false;

    obj.sections.forEach(
        function(section) {
            sectionType = section.type;
            html += "\n\n";

            switch(section.type) {
                case 'banner':
                    html += "<section class=\""+commonClass;
                    if (true === isFirstSection) {
                        html += " builder-section-first";
                        isFirstSection = false;
                    }
                    html += " \">";
                    html += embedBanner(section["background-image"], section[""]);
                    html += "</section>";
                    break;
                case 'image':
                    html += "<section class=\""+commonClass;
                    if (true === isFirstSection) {
                        html += " builder-section-first";
                        isFirstSection = false;
                    }
                    html += " \">";
                    html += '<div class="builder-section-content"> \
                               <img width="'+section.width+'" height="'+section.height+'" url="'+section.url+'" class="'+section.class+'"> \
                             </div> \
                            </section>';
                    break;
                case 'gallery':
                    html += "<section class=\""+commonClass;
                    if (true === isFirstSection) {
                        html += " builder-section-first";
                        isFirstSection = false;
                    }
                    html += " \">";
                    var gallerySections = section.sections;
                    gallerySections.forEach(
                        function(gallerySection) {
                            if ('figure' === gallerySection.type) {
                                html += '<figure class="builder-gallery-image" style="background-image: url(&#039;'+gallerySection["background-image"]+'&#039;);"></figure> \
                                            <div class="builder-gallery-content"> \
                                            <div class="builder-gallery-content-inner"> \
                                            <div class="builder-gallery-description"> \
                                            ' + gallerySection.description + ' \
                                            </div> \
                                            </div> \
                                            </div>';
                            }
                        }
                    );
                    html += "</section>";
                    break;
                case 'content':
                    if (section.columns > 1) {
                        html += "<section class=\""+commonClass;
                        if (true === isFirstSection) {
                            html += " builder-section-first";
                            isFirstSection = false;
                        }
                        html += " \">";
                        
                        var contentSections = section.sections;
                        contentSections.forEach(
                            function(contentSection) {

                                if ('image' === contentSection.type) {

                                    html += '<div class="builder-section-content"> \
                                             <img width="'+contentSection.width+'" height="'+contentSection.height+'" url="'+contentSection.url+'" class="'+contentSection.class+'">' + '\
                                             </div>';

                                } else if ('content' === contentSection.type) {
                                    if ('' != contentSection["background-image"]) {
                                        html += embedBackgroundImage(section["background-image"]);
                                    }
                                    if ('' != contentSection.text) {
                                        html += embedText(contentSection.text);
                                    }
                                }
                            }
                        );
                        html += "</section>";

                    } else { //section has 1 column
                        html += "<section class=\""+commonClass;
                        if (true === isFirstSection) {
                            html += " builder-section-first";
                            isFirstSection = false;
                        }
                        if ('' != section["background-image"]) {
                            html += " builder-section-banner";
                        } 
                        html += "\">";
                        
                        if ('' != section["background-image"]) {
                            html += embedBackgroundImage(section["background-image"]);
                        }
                        if ('' != section.text) {
                            html += '<div class="builder-section-content">'
                            html += embedText(section.text);
                            html += '</div>';
                        }
                    }
                    html += '</section>';
                    break;
                case 'video':
                    html += "<section class=\""+commonClass;
                    if (true === isFirstSection) {
                        html += " builder-section-first";
                        isFirstSection = false;
                    }
                    html += " \">";
                    html += '<div class="builder-section-content"> \
                               <iframe width="1280" height="720" src="'+section.url+'" frameborder=\"0\" allowfullscreen></iframe> \
                             </div> \
                            </section>';
                    break;
            }
        }
    );

    staticHTML = staticHTML.replace('##SECTIONS_CONTENT##', html);

    response.write(staticHTML);
    response.end(); 

}
    
function embedBackgroundImage(imageUrl) {
    html = '<div class="builder-section-content">';
    html += "<div class=\"builder-banner-slide content-position-none\" style=\"background-image: url('"+imageUrl+"');\">";
    html += '</div>';

    return html;
}

function embedText(text) {
    return '<div class="builder-banner-inner-content">' + text + '</div>';
}

function embedBanner(imageUrl, bannerText)
{
    html = '<div class="builder-section-content">';
    html += '<div class="builder-banner-slide builder-banner-slide-500_750 content-position-none" style="background-image: url(&#039;'+imageUrl+'&#039;);>';
    html += '<div class="builder-banner-content">';
    html += '<div class="builder-banner-inner-content">';
    html += bannerText;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
}
