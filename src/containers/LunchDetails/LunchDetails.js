import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import DeliveryPeriod from 'components/DeliveryPeriod/DeliveryPeriod';
import find from 'lodash/find';
import Button from 'components/Button/Button';
import Lunch from 'components/Lunch/Lunch';
import Boxes from 'components/Boxes/Boxes';
import ColumnLayout from 'components/ColumnLayout/ColumnLayout';
import Dishes from './Dishes/Dishes';
import Cook from './Cook/Cook';
import CookPreview from './Cook/Preview/Preview';
import Purchase from './Purchase/Purchase';
import PurchasePreview from './Purchase/Preview/Preview';
import Photos from './Photos/Photos';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

@asyncConnect([
  {key: 'lunch', promise: ({params, helpers}) => helpers.client.get('/lunches/' + params.lunchId)},
  {key: 'tariffs', promise: ({helpers, store}) => {
    if (!store.getState().reduxAsyncConnect.tariffs) {
      return helpers.client.get('/delivery_tariffs').then(tariffs => tariffs.resources);
    }
  }}
])
@connect(state => ({auth: state.auth}))
export default class LunchDetails extends Component {
  static propTypes = {
    lunch: PropTypes.object.isRequired,
    tariffs: PropTypes.array.isRequired
  };

  static contextTypes = {
    client: PropTypes.object.isRequired
  };

  state = {
    cookOpened: false,
    purchaseOpened: false,
    otherLunches: []
  };

  componentDidMount() {
    this.context.client.get('/lunches', { params: {
      cook_id: this.props.lunch.resource.cook_id
    }}).then(response => {
      this.setState({otherLunches: response.resources});
    });
  }

  render() {
    const styles = require('./LunchDetails.scss');
    const {resource: lunch} = this.props.lunch;
    const {cook} = lunch;
    const otherLunches = this.state.otherLunches;
    const boxes = otherLunches.map(otherLunch => ({
      component: <Lunch lunch={otherLunch}/>
    }));

    const individualTariff = find(this.props.tariffs, {individual: true});

    const leftSidebarClasses = classNames(styles.leftSidebar, {
      [styles.leftSidebarOpened]: this.state.cookOpened
    });

    const buyContainerClasses = classNames(styles.buyContainer, {
      [styles.buyContainerOpened]: this.state.purchaseOpened
    });

    return (
      <ColumnLayout className={styles.root}>
        <div className={styles.middlePart}>
          <div className={styles.middlePartContent}>
            <div className={leftSidebarClasses}>
              <ReactCSSTransitionGroup transitionEnterTimeout={310} transitionLeaveTimeout={310} transitionName="overlay">
                {this.state.cookOpened && <div key="overlay" className={styles.overlay}
                                               onClick={() => this.setState({cookOpened: false})}></div>}
              </ReactCSSTransitionGroup>
              <div className={styles.cookContainer}>
                <Cook cook={cook}/>
              </div>
            </div>
            <div className={styles.lunchContainer}>
              <div className={styles.header}>
                <h1>Обед от {cook.first_name} {cook.last_name}</h1>
                <DeliveryPeriod className={styles.deliveryPeriod} time={lunch.ready_by} />
              </div>
              <div className={styles.previewsContainer}>
                <CookPreview cook={cook} className={styles.cookPreview}
                             onClick={() => this.setState({cookOpened: true})}/>
                <PurchasePreview lunch={lunch} className={styles.purchasePreview}
                                 onClick={() => this.setState({purchaseOpened: true})}/>
              </div>
              <div className={styles.lunch}>
                <div className={styles.lunchContent}>
                  <div className={styles.lunchContentInner}>
                    <Photos className={styles.photos} lunch={lunch}/>
                    <Dishes dishes={lunch.dishes}/>
                  </div>
                </div>
                <div className={buyContainerClasses}>
                  <ReactCSSTransitionGroup transitionEnterTimeout={310} transitionLeaveTimeout={310} transitionName="overlay">
                    {this.state.purchaseOpened && <div key="overlay" className={styles.overlay}
                                                       onClick={() => this.setState({purchaseOpened: false})}></div>}
                  </ReactCSSTransitionGroup>
                  <div className={styles.buyContent}>
                    <Purchase lunch={lunch} individualTariff={individualTariff}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.otherLunches}>
          <h2>Обеды на другое время от {cook.first_name} {cook.last_name}</h2>
          <Boxes boxes={boxes}/>
          {null && <div className={styles.moreContainer}>
            <Button flat outlined className={styles.moreButton} label="Показать еще" />
          </div>}
        </div>
      </ColumnLayout>
    );
  }
}
