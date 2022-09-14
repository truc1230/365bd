/** @format */

//@ts-nocheck

import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ToolboxLayout extends React.Component {
  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout(13),
  };

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: { lg: [] },
    toolbox: { lg: this.props.initialLayout },
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }
  renderToolBoxItem = (item, onTakeItem) => {
    return (
      <div key={item.i} className='toolbox__items__item relative' onClick={()=>onTakeItem( item)}>
        <div className='hide-button' onClick={(e)=>this.onDeleteItem(e,item)}>
          &times;
        </div>
        {item.i}
      </div>
    );
  };
  renderToolBox = (items, onTakeItem) => {
    return (
      <div className='toolbox'>
        <span className='toolbox__title'>Toolbox</span>
        <div className='toolbox__items'>
          <button onClick={this.onAddItem.bind(this)}>Add</button>
          {items.map((item) => this.renderToolBoxItem(item, onTakeItem))}
        </div>
      </div>
    );
  };

  generateDOM() {
    return _.map(this.state.layouts[this.state.currentBreakpoint], (l) => {
      return (
        <div key={l.i} className={l.static ? 'static' : ''}>
          <div className='hide-button' onClick={()=>this.onPutItem(l)}>
            &times;
          </div>
          {l.static ? (
            <span className='text' title='This item is static and cannot be removed or resized.'>
              Static - {l.i}
            </span>
          ) : (
            <span className='text'>{l.i}</span>
          )}
        </div>
      );
    });
  }

  onBreakpointChange = (breakpoint) => {
    this.setState((prevState) => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]: prevState.toolbox[breakpoint] || prevState.toolbox[prevState.currentBreakpoint] || [],
      },
    }));
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType = oldCompactType === 'horizontal' ? 'vertical' : oldCompactType === 'vertical' ? null : 'horizontal';
    this.setState({ compactType });
  };

  onTakeItem = (item) => {
    this.setState((prevState) => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[prevState.currentBreakpoint].filter(({ i }) => i !== item.i),
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [...prevState.layouts[prevState.currentBreakpoint], item],
      },
    }));
  };

  onAddItem = () => {
    const index = this.state.layouts[this.state.currentBreakpoint].length + this.state.toolbox[this.state.currentBreakpoint].length;
    const newItem = generateNewItem(index);
    this.setState((prevState) => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: [...(prevState.toolbox[prevState.currentBreakpoint] || []), newItem],
      },
    }));
  };

  onDeleteItem = (e, item) => {
    e.stopPropagation();
    this.setState((prevState) => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[prevState.currentBreakpoint].filter(({ i }) => i !== item.i),
      },
    }));
  };

  onPutItem = (item) => {
    this.setState((prevState) => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [...(prevState.toolbox[prevState.currentBreakpoint] || []), item],
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[prevState.currentBreakpoint].filter(({ i }) => i !== item.i),
        },
      };
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: generateLayout() },
    });
  };

  render() {
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]} columns)
        </div>
        <div>Compaction type: {_.capitalize(this.state.compactType) || 'No Compaction'}</div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <button onClick={this.onCompactTypeChange}>Change Compaction Type</button>

        {this.renderToolBox(this.state.toolbox[this.state.currentBreakpoint] || [], this.onTakeItem)}

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}>
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function generateLayout(numberOfBox = 1) {
  return _.map(_.range(0, numberOfBox), function (item, i) {
    return generateNewItem(i);
  });
}

function generateNewItem(i) {
  var y = Math.ceil(Math.random() * 4) + 1;
  return {
    x: (_.random(0, 5) * 2) % 12,
    y: Math.floor(i / 6) * y,
    w: 2,
    h: y,
    i: i.toString(),
  };
}