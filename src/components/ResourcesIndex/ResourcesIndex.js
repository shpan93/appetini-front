import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Button from 'components/Button/Button';
import styles from './styles.scss';

const fieldTypes = {
  label: value => value,
  image: value => <img className={styles.img} src={value}/>
};

const renderField = resource => (field, index) => (
  <td key={index}>
    {fieldTypes[field.type || 'label'](field.value(resource))}
  </td>
);

export default class ResourcesIndex extends Component {
  static propTypes = {
    resources: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    createTitle: PropTypes.string,
    customActions: PropTypes.array,
    urlName: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  goToCreate(event) {
    event.preventDefault();
    this.context.router.push(`/admin/${this.props.urlName}/new`);
  }

  render() {
    const { resources, title, createTitle, fields, urlName, customActions } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.firstLine}>
          <h1>{title}</h1>
          {createTitle && <Button flat accent label={createTitle} onClick={::this.goToCreate}/>}
        </div>
        <table className={styles.mainTable}>
          <tbody>
          <tr>
            {fields.map((field, index) =>
              <th key={index}>{field.title}</th>
            )}
            <th>Действия</th>
          </tr>
          {resources.map(resource =>
            <tr key={resource.id}>
              {fields.map(renderField(resource))}
              <td>
                <div className={styles.action}>
                  <Link to={`/admin/${urlName}/${resource.id}/edit`}><Button flat accent label="Редактировать"/></Link>
                </div>
                {
                  customActions && customActions.map((custom, idx ) => {
                    return (
                      <div key={idx} className={styles.action}>
                        <Button onClick={() => custom.action(resource.id)} flat accent label={custom.title}/>
                      </div>);
                  })
                }
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}
