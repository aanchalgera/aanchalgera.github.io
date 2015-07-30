var fs = require('fs');

module.exports = {
    parse: parse,
    embedBackgroundImage: embedBackgroundImage,
    embedText: embedText
}

function parse(request, response) {

    response.setHeader('content-type', 'text/html');
    var obj = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

    var html = '';

    obj.sections.forEach(
        function(section) {
            sectionType = section.type;

            switch(section.type) {
                case 'image':
                    html += "<section>";
                    html += "<div class=\"builder-section-content\"> " +
                             '<img width="'+section.width+'" height="'+section.height+'" url="'+section.url+'" class="'+section.class+'">' + 
                             "</div>";
                    html += "</section>";
                    break;

                case 'gallery':
                    html += '<section>';
                    var gallerySections = section.sections;
                    gallerySections.forEach(
                        function(gallerySection) {
                            if ('figure' === gallerySection.type) {
                                html += "<figure class=\"builder-gallery-image\" style=\"background-image: url('"+gallerySection["background-image"]+"');></figure>";
                                html += '<div class="builder-gallery-content">';
                                html += '<div class="builder-gallery-content-inner">';
                                html += '<div class="builder-gallery-description">';
                                html += gallerySection.description;
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                            }
                        }
                    );
                    html += "</section>";
                    break;

                case 'content':
                    html += '<section>';
                    if (section.columns > 1) {
                        var contentSections = section.sections;
                        contentSections.forEach(
                            function(contentSection) {

                                if ('image' === contentSection.type) {
                                    html += "<div class=\"builder-section-content\"> " +
                                             '<img width="'+contentSection.width+'" height="'+contentSection.height+'" url="'+contentSection.url+'" class="'+contentSection.class+'">' + 
                                             "</div>";
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
                        if ('' != section["background-image"]) {
                            html += embedBackgroundImage(section["background-image"]);
                        }
                        if ('' != section.text) {
                            html += embedText(section.text);
                        }
                    }
                    html += '</section>';
                    break;

                case 'video':
                    html += '<section> \
                                <div class="builder-section-content"> \
                                    <iframe width="1280" height="720" src="'+section.url+'" frameborder=\"0\" allowfullscreen></iframe> \
                                </div> \
                            </section>';
                    break;

            }
        }
    );

    response.write(html);
    response.end(); 
}
    
function embedBackgroundImage(imageUrl) {
    html = '<div class="builder-section-content">';
    html += "<div class=\"builder-banner-slide content-position-none\" style=\"background-image: url('"+imageUrl+"');>";
    html += '</div>';

    return html;
}

function embedText(text) {
    return '<div class="builder-banner-inner-content">' + text + '</div>';
}