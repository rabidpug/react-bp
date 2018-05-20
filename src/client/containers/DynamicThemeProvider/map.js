import store from 'Store';
import styles from 'Styles';
const map = { State: state => ( { theme: styles.themes[store.ui.get.theme( state )], } ), };

export default map;
