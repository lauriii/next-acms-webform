import {components, getChildElements} from 'nextjs-drupal-webform';
import classNames from "classnames";

const tableDecorator = (DecoratedComponent) => {
  return function WebformCustomTable(props) {
    const { element } = props;
    getChildElements(element).forEach((key, index) => {
      element[key]['#attributes'] = {
        ...(element[key]['#attributes'] ?? {}),
        class: classNames(index % 2 === 0 ? 'table-row-even' : 'table-row-odd'),
      }
    });

    return <DecoratedComponent {...props} element={element} tdProps={{ className: classNames('py-3', 'pr-6')}} />
  };
};

export default tableDecorator(components.webform_table);