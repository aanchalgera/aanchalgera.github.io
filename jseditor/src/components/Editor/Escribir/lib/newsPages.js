// @flow
import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const page1 = (
  <span className="newspage">
    <Row className="m-no-margin">
      <Col sm={6} smOffset={3}>
        <div className="news-content">
          <span className="news-title">Lo nuevo en Alfa (7)</span>
          <h2 className="type-title-dark">Lo esencial: texto e imágenes</h2>
          <p className="paragraph">
            En Alfa la principal novedad es que nos quitamos de en medio el
            código visible. A partir de ahora el formato que des a los textos e
            imágenes se aplicará directamente sobre ellos.
          </p>
          <p className="paragraph">
            No obstante, no es una preview 100% real, para eso times el{' '}
            {'"ojo"'} en la esquina superior derecha
          </p>
          <h4>Texto con formato</h4>
          <ul>
            <li>- Abre el editor y escribe directamente.</li>
            <li>
              - Para dar formato al texto que acabas de escribir, resáltalo y
              las opciones aparecerán en pantalla.
            </li>
            <li>- También funcionan los atajos de Markdown.</li>
          </ul>
          <img src="https://i.blogs.es/news/texto-con-formato.gif" alt="" />
          <h4>Imágenes estáticas</h4>
          <p className="paragraph">
            Al pulsar intro aparece un botón (+) para insertar varios tipos de
            objetos en el texto.
          </p>
          <img src="https://i.blogs.es/news/subir-imagen.gif" alt="" />
          <p className="paragraph">
            Lo primero que hemos añadido son imágenes. Con su botón puedes subig
            seleccionar y añadir el testo ahemativo. Una vez añadida a tu texto,
            puedes cambiar su tamaño y alineación haciendo click en ella.
          </p>
        </div>
      </Col>
    </Row>
    <Row className="m-no-margin">
      <Col sm={8} smOffset={2}>
        <img src="https://i.blogs.es/news/image-editing.gif" alt="" />
      </Col>
    </Row>
  </span>
);

export const newsPages = [page1];
