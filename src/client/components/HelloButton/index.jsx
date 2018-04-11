//@flow

import { Button, } from 'antd';
import { connect, } from 'react-redux';
import mapHelloButton from './map';
@connect( mapHelloButton.State, mapHelloButton.Dispatch )
export default class HelloButton extends Button {}
