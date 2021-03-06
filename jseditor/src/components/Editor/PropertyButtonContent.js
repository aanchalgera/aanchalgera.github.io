/* eslint-disable */
import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    var backgroundImageOptions = '',
      backgroundImage;
    let textColour, actualizacion, showSocialShareIcon;
    if (
      this.props.data.backgroundImage != '' &&
      this.props.data.backgroundImage != undefined
    ) {
      backgroundImage = (
        <span className="input-group">
          <input
            type="text"
            placeholder={this.props.data.backgroundImageName}
            className="form-control input-group-sm"
            style={{ width: '50%' }}
          />
          <span className="input-group-btn">
            <button
              onClick={this.props.openResourcePanel.bind(
                this,
                'backgroundImage',
                this.props.dataId,
                '',
                false
              )}
              type="button"
              className="btn btn-default"
            >
              <span className="glyphicon glyphicon-edit" />
            </button>
            <button
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'removeBackgroundImage',
                null
              )}
              type="button"
              className="btn btn-default"
            >
              <span className="glyphicon glyphicon-trash" />
            </button>
          </span>
        </span>
      );
      if ('sectionModule' === this.props.data.type) {
        backgroundImageOptions = backgroundImageOptions = (
          <li>
            <label> Effects </label>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'backgroundFade',
                null
              )}
              className={
                'btn btn-default ' +
                (this.props.data.backgroundFade ? 'active' : '')
              }
            >
              Fade
            </button>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'backgroundRepeat',
                null
              )}
              className={
                'btn btn-default ' +
                (this.props.data.backgroundRepeat ? 'active' : '')
              }
            >
              Repeat
            </button>
            <span className="hint">you can select multiple effects</span>
          </li>
        );
      } else {
        backgroundImageOptions = (
          <li>
            <label> Effects </label>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'parallax',
                null
              )}
              className={
                'btn btn-default ' + (this.props.data.parallax ? 'active' : '')
              }
            >
              Parallax
            </button>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'backgroundFade',
                null
              )}
              className={
                'btn btn-default ' +
                (this.props.data.backgroundFade ? 'active' : '')
              }
            >
              Fade
            </button>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'backgroundRepeat',
                null
              )}
              className={
                'btn btn-default ' +
                (this.props.data.backgroundRepeat ? 'active' : '')
              }
            >
              Repeat
            </button>
            <span className="hint">you can select multiple effects</span>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'backgroundFullscreen',
                null
              )}
              className={
                'btn btn-default ' +
                (this.props.data.backgroundFullscreen ? 'active' : '')
              }
            >
              Fullscreen background
            </button>
          </li>
        );
      }
    } else {
      backgroundImage = (
        <div className="input-group">
          <button
            type="button"
            onClick={this.props.openResourcePanel.bind(
              this,
              'backgroundImage',
              this.props.dataId,
              '',
              false
            )}
            className="btn btn-default"
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
          >
            Select background image
          </button>
        </div>
      );
    }

    if ('content' == this.props.data.type) {
      actualizacion = (
        <li>
          <label> Format </label>
          <button
            onClick={this.props.addBackgroundOptionToResource.bind(
              this,
              'actualizacion',
              null
            )}
            className={
              'btn btn-default ' +
              (this.props.data.actualizacion ? 'active' : '')
            }
          >
            Actualizacion
          </button>
        </li>
      );
    }
    switch (this.props.data.type) {
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
      case 'ficha':
        textColour = '';
        break;
      case 'summary':
        showSocialShareIcon = (
          <div>
            <h5>Share</h5>
            <li>
              <label className="full-line">
                <input
                  type="checkbox"
                  data-id={this.props.dataId}
                  checked={this.props.data.showSummarySocialShareButtons}
                  onChange={this.props.toggleSummarySocialShareButtons}
                />
                Display social sharing buttons here
              </label>
            </li>
          </div>
        );
        break;
      default:
        textColour = (
          <li>
            <label> Text </label>
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'foregroundColor',
                '#FFF'
              )}
              className={
                'btn background-white ' +
                (this.props.data.foregroundColor == '#FFF' ? 'active' : null)
              }
            />
            <button
              type="button"
              onClick={this.props.addBackgroundOptionToResource.bind(
                this,
                'foregroundColor',
                '#000'
              )}
              className={
                'btn background-black ' +
                (this.props.data.foregroundColor == '#000' ? 'active' : null)
              }
            />
          </li>
        );
    }

    return (
      <ul className="list-background">
        <h5>Background</h5>
        <li>
          <label> Colour </label>
          <button
            type="button"
            onClick={this.props.addBackgroundOptionToResource.bind(
              this,
              'backgroundClass',
              'module-bg-color-branded-light'
            )}
            className={
              'btn module-bg-color-branded-light ' +
              (this.props.data.backgroundClass ==
              'module-bg-color-branded-light'
                ? 'active'
                : null)
            }
          />
          <button
            type="button"
            onClick={this.props.addBackgroundOptionToResource.bind(
              this,
              'backgroundClass',
              'module-bg-color-neutral-dark'
            )}
            className={
              'btn module-bg-color-neutral-dark ' +
              (this.props.data.backgroundClass == 'module-bg-color-neutral-dark'
                ? 'active'
                : null)
            }
          />
          <button
            type="button"
            onClick={this.props.addBackgroundOptionToResource.bind(
              this,
              'backgroundClass',
              'module-bg-color-neutral-light'
            )}
            className={
              'btn module-bg-color-neutral-light ' +
              (this.props.data.backgroundClass ==
              'module-bg-color-neutral-light'
                ? 'active'
                : null)
            }
          />
          <button
            type="button"
            onClick={this.props.addBackgroundOptionToResource.bind(
              this,
              'backgroundClass',
              'module-bg-color-branded-dark'
            )}
            className={
              'btn module-bg-color-branded-dark ' +
              (this.props.data.backgroundClass == 'module-bg-color-branded-dark'
                ? 'active'
                : null)
            }
          />
        </li>
        {textColour}
        <li>
          <label> Image </label>
          {backgroundImage}
        </li>
        {backgroundImageOptions}
        {actualizacion}
        {showSocialShareIcon}
      </ul>
    );
  }
}

export default PropertyButtonContent;
