import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';

const AdvancedOptions = () => (
  <fieldset className="country">
    <legend>Avanzado</legend>
    <ul>
      <li>
        <Checkbox
          defaultChecked={false}
          label="Artículo especial"
        />
      </li>
      <li>
        <Checkbox
          defaultChecked={false}
          label="Tiene contenido sensible"
        />
      </li>
      <li>
        <Checkbox
          defaultChecked={false}
          label="Comentarios abiertos"
        />
      </li>
      <li>
        <Checkbox
          defaultChecked={false}
          label="Mostrar fecha de publicación"
        />
      </li>
      <li>
        <Checkbox
          defaultChecked={false}
          label="Mostrar botones de compartir en redes"
        />
      </li>
      <li>
        <Checkbox
          defaultChecked={false}
          label="Mostrar author"
        />
      </li>
      <li>
        <AutoComplete
          floatingLabelText="Autor"
          dataSource={[]}
        />
      </li>
    </ul>
  </fieldset>
);

export default AdvancedOptions;
