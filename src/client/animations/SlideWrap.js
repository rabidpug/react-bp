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
          enter={ { timing: { duration : 1000,
                              ease     : easeExpInOut, },
                    transform: 'scale(1)', } }
          leave={ [
            { timing: { duration : 300,
                        ease     : easeExpInOut, },
              transform: 'scale(0)', },
          ] }
          show={ show }
          start={ { transform: 'scale(0)', } }
          update={ { timing: { duration : 500,
                               ease     : easeExpInOut, },
                     transform: 'scale(1)', } }>
          {( { transform, } ) => ( <WrappedContainer
            style={ { transform, } }
            { ...this.props } /> )}
        </Animate>
      );
    }
  };

export default SlideWrap;
