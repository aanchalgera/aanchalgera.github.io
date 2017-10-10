//@flow
import { searchProducts } from './lib/publishService';
import { AmazonProducts } from './AmazonProducts';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';
import React, { Component } from 'react';
import type { Product } from './lib/flowTypes';

type Props = {
  products: Array<Product>,
  updateParent: (data: Object) => void,
  blogUrl: string,
  postId: number
};

export class ASIN extends Component {
  props: Props;

  state = {
    searchCriteria: 0,
    searchValue: '',
    searchedProducts: [],
    error: ''
  };

  handleCriteriaSelection = (e: SyntheticEvent, value: number) => {
    this.setState({searchCriteria: value});
  }

  handleSearchClick = async () => {
    let products = await searchProducts(this.state.searchValue, this.state.searchCriteria, this.props.blogUrl);
    if (products) {
      this.setState({searchedProducts: products});
    }
  }

  handleTextFieldChange = (e: SyntheticEvent, value: string) => {
    this.setState({searchValue: value});
  }

  updateSearchedProducts = (products: Array<Product>) => {
    this.setState({searchedProducts: products});
  }

  updateError = (error: string) => {
    this.setState({error: error});
  }

  render () {
    return (
      <div>
        <Row>
          <Col sm>
            <DropDownMenu
              value={this.state.searchCriteria}
              onChange={this.handleCriteriaSelection}
            >
              <MenuItem value={0} primaryText="ASIN" />
              <MenuItem value={1} primaryText="Nombre del producto" />
            </DropDownMenu>
          </Col>
          <Col sm>
            <TextField
              hintText="BO1LSXPO2K...."
              value={this.state.searchValue}
              onChange={this.handleTextFieldChange}
              errorText={this.state.error}
            />
          </Col>
          <Col sm>
            <RaisedButton
              label="Buscar"
              onClick={this.handleSearchClick}
              disabled={!Boolean(this.state.searchValue)}
            />
          </Col>
        </Row>
        <AmazonProducts
          searchedProducts={this.state.searchedProducts}
          products={this.props.products}
          updateParent={this.props.updateParent}
          blogUrl={this.props.blogUrl}
          postId={this.props.postId}
          updateSearchedProducts={this.updateSearchedProducts}
          updateError={this.updateError}
        />
      </div>
    )
  }
}