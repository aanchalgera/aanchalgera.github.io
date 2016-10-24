import React from 'react';

export default class FichaTechnica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxId: props.data.maxId || 3,
      name: props.data.name || '',
      productDetail: props.data.productDetail || '',
      productImage: props.data.productImage || null,
      otherImage: props.data.otherImage || null,
      otherDetail: props.data.otherDetail || '',
      dataRows: props.data.dataRows || [
        { dataSheet: '', text: '', link: '', id: 0 },
        { dataSheet: '', text: '', link: '', id: 1 },
        { dataSheet: '', text: '', link: '', id: 2 }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ productImage: nextProps.data.productImage, otherImage: nextProps.data.otherImage });
  }

  focus() {
    this.refs.field.focus();
  }

  update(params) {
    this.setState(params, () => {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        this.props.update(this.state);
      }, 1000);
    });
  }

  add(e) {
    e.preventDefault();
    let { dataRows, maxId } = this.state, count = 0, newDataRows = [];

    count = this.refs.addLinks.value;
    for (let i = 0; i < count; i++) {
      newDataRows[i] = { dataSheet: '', text: '', link: '', id: maxId++ };
    }
    dataRows.push(...newDataRows);

    this.update({ dataRows, maxId });
  }

  move(e, type, index) {
    e.preventDefault();
    let { dataRows } = this.state;

    switch(type) {
      case 'up':
        dataRows[index - 1] = dataRows.splice(index, 1, dataRows[index - 1])[0];
        break;

      case 'down':
        dataRows[index + 1] = dataRows.splice(index, 1, dataRows[index + 1])[0];
        break;
    }

    this.update({ dataRows });
  }

  delete(e, index) {
    e.preventDefault();
    let { dataRows } = this.state;
    dataRows.splice(index, 1);

    this.update({ dataRows });
  }

  updateCell(rowIndex, columnIndex, e) {
    e.preventDefault();
    let { dataRows } = this.state;
    if (columnIndex == 0) {
      dataRows[rowIndex].dataSheet = e.target.value;
    } else if (columnIndex == 1) {
      dataRows[rowIndex].text = e.target.value;
    } else {
      dataRows[rowIndex].link = e.target.value;
    }

    this.update({ dataRows });
  }

  render() {
    const { dataRows } = this.state;
    const totalRows = dataRows.length;
    let productImage, otherImage;
    if (this.state.productImage) {
      productImage = (
        <div style= {{ background:'#f5f5f5', padding:'5px', display:'inline-block' }}>
          <span className="hint">
            {`${this.state.productImage.original_filename}.${this.state.productImage.format}`}
            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
              <button className="btn btn-default" onClick={e => this.props.openResourcePanel('edit', {currentIndex: this.props.dataId, imageIndex: 'productImage'}, 'image', false, e)}>
                <span className="glyphicon glyphicon-pencil"></span>
              </button>
              <button className="btn btn-default" onClick={e => this.props.deleteImage({sectionIndex: this.props.dataId, imageIndex: 'productImage'}, e)}>
                <span className="glyphicon glyphicon-trash"></span>
              </button>
            </div>
          </span>
        </div>
      );
    } else {
      productImage = (
        <button className="btn btn-default" onClick={e => this.props.openResourcePanel('productImage', this.props.dataId, '', false, e)}>Add Image</button>
      );
    }
    if (this.state.otherImage) {
      otherImage = (
        <div style= {{ background:'#f5f5f5', padding:'5px', display:'inline-block' }}>
          <span className="hint">
          {`${this.state.otherImage.original_filename}.${this.state.otherImage.format}`}
            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
              <button className="btn btn-default" onClick={e => this.props.openResourcePanel('edit', {currentIndex: this.props.dataId, imageIndex: 'otherImage'}, 'image', false, e)}>
                <span className="glyphicon glyphicon-pencil"></span>
              </button>
              <button className="btn btn-default" onClick={e => this.props.deleteImage({sectionIndex: this.props.dataId, imageIndex: 'otherImage'}, e)}>
                <span className="glyphicon glyphicon-trash"></span>
              </button>
            </div>
          </span>
        </div>
      );
    } else {
      otherImage = (
        <button className="btn btn-default" onClick={e => this.props.openResourcePanel('otherImage', this.props.dataId, '', false, e)}>Add Image</button>
      );
    }
    const placeholder = [
      [{dataSheet: 'Price'}, {text: '1.99€'}, {link: ''}],
      [{dataSheet: 'Developer'}, {text: 'Rovio'}, {link: 'http://epi.angrybirds.com/'}],
      [{dataSheet: 'To Download'}, {text: 'Android on Google play'}, {link: 'https://play.google.com/store/apps/details?id=com.rovio.gold'}]
    ];
    const table = (
      dataRows.map((dataRow, i) => {
        return (
          <tr key={dataRow.id}>
            <td className="rows-control">
              <div className="btn-group btn-group-xs btn-group-vertical">
                {
                  (i == 0 || totalRows == 1) ? null :
                    <button className="btn btn-default" title="Move row up" onClick={e => this.move(e, 'up', i)}>
                      <span className="glyphicon glyphicon-arrow-up"></span>
                    </button>
                }
                {
                  (i == totalRows - 1) ? null :
                    <button className="btn btn-default" title="Move row down" onClick={e => this.move(e, 'down', i)}>
                      <span className="glyphicon glyphicon-arrow-down"></span>
                    </button>
                }
                {
                  (totalRows == 1) ? null :
                    <button className="btn btn-default" title="Delete row" onClick={e => this.delete(e, i)}>
                      <span className="glyphicon glyphicon-trash"></span>
                    </button>
                }
              </div>
            </td>
            <td>
              <input
                type="text"
                placeholder={i<3 ? placeholder[i][0].dataSheet : ''}
                defaultValue={dataRow.dataSheet}
                className="form-control"
                onChange={e => this.updateCell(i, 0, e)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder={i<3 ? placeholder[i][1].text : ''}
                defaultValue={dataRow.text}
                className="form-control"
                onChange={e => this.updateCell(i, 1, e)}
              />
            </td>
            <td>
             <input
               type="text"
               placeholder={i<3 ? placeholder[i][2].link : ''}
               defaultValue={dataRow.link}
               className="form-control"
               onChange={e => this.updateCell(i, 2, e)}
             />
            </td>
          </tr>
        );
      })
    );

    return (
      <div>
        <label className="ptitle">Ficha technica</label>
        <div className="table-data-container">
          <div className={'asset-size-' + this.props.data.layout}>
            <div className="form-group">
              <label>Product name</label>
              <span className="hint"> (Required) </span>
              <input
                type="text"
                className="form-control"
                ref="field"
                defaultValue={this.state.name}
                onChange={() => this.update({ name: this.refs.field.value })}
              />
            </div>
            <div className="form-group">
              <label>Product detail</label>
              <input
                type="text"
                className="form-control"
                ref="productDetail"
                placeholder="Model, version, season ..."
                defaultValue={this.state.productDetail}
                onChange={() => this.update({ productDetail: this.refs.productDetail.value })}
              />
            </div>
            <div className="form-group">
              <label>Product image</label>
              {productImage}
            </div>
            <div className="form-group">
              <label>Optional image</label>
              {otherImage}
            </div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th className="rows-empty"></th>
                  <th>Data sheet</th>
                  <th>Text</th>
                  <th>Link</th>
                </tr>
                {table}
              </tbody>
            </table>
            <div className="table-add-more clearfix add-more-rows">
              <div className="form-group pull-left">
                <label>Add more links</label>
                <input type="number" ref="addLinks" min="1" defaultValue="1" className="form-control input-sm" />
                <button type="submit" className="btn btn-default  btn-sm" onClick={e => this.add(e)}>
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Other details</label>
              <span className="hint"> (Optional, you can use html) </span>
              <textarea
                className="form-control"
                ref="otherDetail"
                defaultValue={this.state.otherDetail}
                onChange={() => this.update({ otherDetail: this.refs.otherDetail.value })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
