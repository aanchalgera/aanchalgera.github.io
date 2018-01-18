//@flow
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';
import * as React from 'react';
import {
  addProductToBackend,
  removeProductFromBackend
} from './lib/publishService';
import { getProductBasedOnAsin, removeProduct } from './lib/publishHelpers';
import { Label } from './Label';
import { Product } from './lib/flowTypes';

type Props = {
  updateError: (data: string) => void,
  products: Array<Product>,
  searchedProducts: Array<Product>,
  blogUrl: string,
  postId: number,
  updateParent: (data: Object) => void,
  updateSearchedProducts: (data: Array<Product>) => void
};

export class AmazonProducts extends React.Component<Props> {
  addProduct = async (asin: string) => {
    let product = getProductBasedOnAsin(this.props.searchedProducts, asin);
    try {
      let response = await addProductToBackend(
        product,
        this.props.blogUrl,
        this.props.postId
      );
      product['ecommerceId'] = response['ecommerceId'];
      let updatedProducts = [...this.props.products, product];
      this.props.updateParent({ products: updatedProducts });
      let updatedSearchedProducts = removeProduct(
        this.props.searchedProducts,
        asin
      );
      this.props.updateSearchedProducts(updatedSearchedProducts);
      this.props.updateError('');
    } catch (err) {
      console.log(err.responseText);
      this.props.updateError(err.responseText);
    }
  };

  removeProduct = async (asin: string) => {
    let product = getProductBasedOnAsin(this.props.products, asin);
    try {
      removeProductFromBackend(
        this.props.blogUrl,
        product.ecommerceId,
        this.props.postId
      );
      let updatedProducts = removeProduct(this.props.products, asin);
      this.props.updateParent({ products: updatedProducts });
    } catch (err) {
      console.log(err.responseText);
      this.props.updateError(err.responseText);
    }
  };

  render() {
    if (
      0 === this.props.searchedProducts.length &&
      0 === this.props.products.length
    ) {
      return null;
    }

    let searchedProductsHtml = (
      <div>
        {this.props.searchedProducts.map(product => {
          return (
            <div key={product.asin}>
              <Row>
                <a href={product.url}>{product.title}</a>
              </Row>
              <Row>
                <RaisedButton
                  label="Anadir"
                  onClick={() => this.addProduct(product.asin)}
                />
              </Row>
            </div>
          );
        })}
      </div>
    );

    let productsHtml = (
      <div>
        {this.props.products.map(product => {
          return (
            <div key={product.asin}>
              <Row>
                <a href={product.url}>{product.title}</a>
              </Row>
              <Row>
                <RaisedButton
                  label="Quitar"
                  onClick={() => this.removeProduct(product.asin)}
                />
              </Row>
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
        <Col sm>
          <Row>
            <Label label="Productos disponibles:" />
          </Row>
          {searchedProductsHtml}
        </Col>
        <Col sm>
          <Row>
            <Label label="Productos seleccionados:" />
          </Row>
          {productsHtml}
        </Col>
      </div>
    );
  }
}
