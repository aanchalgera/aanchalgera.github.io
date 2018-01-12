// @flow
import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const page1 = (
  <span className="newspage">
    <Row className="m-no-margin">
      <Col sm={2} smOffset={2}>
        Lo nuevo en Alfa (7)
      </Col>
      <Col sm={5}>
        <div className="paragraph">
          <h2>Galerías de fotos para tus artículos</h2>
          <p>
            Con las galerías puedes incluir en tu artítulo colecciones de fotos
            con un diseńo compacto, y tus lectores podrán ver cada foto a tamańo
            grande haciendo click en ella. También puedes:
          </p>
          <ul>
            <li>- Usar pie de foto para cada imagen</li>
            <li>- Hacer galerías de GIFs animados</li>
            <li>- Elegir el tamańo de las miniaturas</li>
          </ul>
          <p>Asf se verá una galería de fotos en tu articulo:</p>
        </div>
      </Col>
      <Col sm={2}>
        <img src="/images/galleryButton.jpg" alt="" />
      </Col>
    </Row>
    <Row className="m-no-margin">
      <Col sm={10} smOffset={1}>
        <img src="/images/gallery.jpg" alt="" />
      </Col>
    </Row>
  </span>
);

const page2 = (
  <span className="newspage">
    <Row className="m-no-margin">
      <Col sm={2} smOffset={2}>
        Lo nuevo en Alfa (6)
      </Col>
      <Col sm={5}>
        <div className="paragraph">
          <h2>Gráficos de datos</h2>
          <p>
            Con gráficos puedes facilitar al lector comprender la informaci6n
            basada en gran cantidad de datos. Con esta herramienta puedes
            incluir en to artículo diagramas creados con:
          </p>
          <ul>
            <li>- Info.gram</li>
            <li>- CARTO</li>
          </ul>
          <p>
            Puedes pedir los datos de acceso de Weblogs SL para estos servicios
            en accesos@weblogssl.com
          </p>
          <p>
            Si tienes dudas de qué tipo de gráfico to conviene más usar para
            contar lo que quieres, puedes consulter esta guia breve de
            visualización de datos
          </p>
        </div>
      </Col>
      <Col sm={2}>
        <img src="/images/galleryButton.jpg" alt="" />
      </Col>
    </Row>
    <Row className="m-no-margin">
      <Col sm={10} smOffset={1}>
        <img src="/images/graph.jpg" alt="" />
      </Col>
    </Row>
  </span>
);

export const newsPages = [page1, page2];
