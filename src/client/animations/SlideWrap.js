import React, { Component, } from 'react';

import { Animate, } from 'react-move';
import { easeExpInOut, } from 'd3-ease';

const SlideWrap = WrappedContainer =>
  class SlideWrap extends Component {
    constructor ( props ) {
      super( props );

      this.state = { show: false, };
    }

    componentDidMount () {
      this.setState( { show: true, } );
    }

    componentWillUnmount () {
      this.setState( { show: false, } );
    }

    render () {
      const { show, } = this.state;

      return (
        <Animate
          enter={ { scale  : [ 1, ],
                    timing : { duration : 300,
                               ease     : easeExpInOut, }, } }
          leave={ [
            { scale  : [ 0, ],
              timing : { duration : 300,
                         ease     : easeExpInOut, }, },
          ] }
          show={ show }
          start={ { scale: [ 0, ], } }
          update={ { scale  : [ 1, ],
                     timing : { duration : 500,
                                ease     : easeExpInOut, }, } }>
          {( { scale, } ) => (
            <WrappedContainer
              style={ { transform       : `scaleY(${scale})`,
                        transformOrigin : 'center top', } }
              { ...this.props }
            />
          )}
        </Animate>
      );
    }
  };

export default SlideWrap;
