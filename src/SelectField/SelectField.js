import React, {Component, PropTypes} from 'react';
import TextField from '../TextField';
import DropDownMenu from '../DropDownMenu';

function getStyles(props) {
  return {
    label: {
      paddingLeft: 0,
      top: props.floatingLabelText ? 6 : -4,
    },
    icon: {
      right: 0,
      top: props.floatingLabelText ? 22 : 14,
    },
    hideDropDownUnderline: {
      borderTop: 'none',
    },
  };
}

class SelectField extends Component {
  static propTypes = {
    /**
     * If true, the width will automatically be set according to the
     * items inside the menu.
     * To control the width in CSS instead, leave this prop set to `false`.
     */
    autoWidth: PropTypes.bool,
    /**
     * The `MenuItem` elements to populate the select field with.
     * If the menu items have a `label` prop, that value will
     * represent the selected menu item in the rendered select field.
     */
    children: PropTypes.node,
    /**
     * If true, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Override the inline-styles of the error element.
     */
    errorStyle: PropTypes.object,
    /**
     * The error content to display.
     */
    errorText: PropTypes.node,
    /**
     * Override the inline-styles of the floating label.
     */
    floatingLabelStyle: PropTypes.object,
    /**
     * The content of the floating label.
     */
    floatingLabelText: PropTypes.node,
    /**
     * If true, the select field will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * Override the inline-styles of the hint element.
     */
    hintStyle: PropTypes.object,
    /**
     * The hint content to display.
     */
    hintText: PropTypes.node,
    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * The id prop for the text field.
     */
    id: PropTypes.string,
    /**
     * Override the label style when the select field is inactive.
     */
    labelStyle: PropTypes.object,
    /**
     * Callback function fired when the select field loses focus.
     *
     * @param {object} event `blur` event targeting the select field.
     */
    onBlur: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected.
     *
     * @param {object} event TouchTap event targeting the menu item
     * that was selected.
     * @param {number} key The index of the selected menu item.
     * @param {any} payload The `value` prop of the selected menu item.
     */
    onChange: PropTypes.func,
    /**
     * Callback function fired when the select field gains focus.
     *
     * @param {object} event `focus` event targeting the select field.
     */
    onFocus: PropTypes.func,
    /**
     * Override the inline-styles of the underlying `DropDownMenu` element.
     */
    selectFieldRoot: PropTypes.object, // Must be changed!

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of the underline element when the select
     * field is disabled.
     */
    underlineDisabledStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underline element when the select field
     * is focused.
     */
    underlineFocusStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underline element.
     */
    underlineStyle: PropTypes.object,
    /**
     * The value that is currently selected.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    autoWidth: false,
    disabled: false,
    fullWidth: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  onFocus = (e) => {
    const { onFocus } = this.props
    if (onFocus) onFocus(e)
    if (!e.defaultPrevented)
      this.refs['dropdownMenu'].setOpen(true)
  };

  render() {
    const {
      autoWidth,
      children,
      style,
      labelStyle,
      iconStyle,
      id,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineStyle,
      errorStyle,
      selectFieldRoot,
      disabled,
      floatingLabelText,
      floatingLabelStyle,
      hintStyle,
      hintText,
      fullWidth,
      errorText,
      onBlur,
      onChange,
      value,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context);

    return (
      <TextField
        style={style}
        floatingLabelText={floatingLabelText}
        floatingLabelStyle={floatingLabelStyle}
        hintStyle={hintStyle}
        hintText={(!hintText && !floatingLabelText) ? ' ' : hintText}
        fullWidth={fullWidth}
        errorText={errorText}
        underlineStyle={underlineStyle}
        errorStyle={errorStyle}
        onFocus={this.onFocus}
        onBlur={onBlur}
        id={id}
        underlineDisabledStyle={underlineDisabledStyle}
        underlineFocusStyle={underlineFocusStyle}
      >
        <DropDownMenu
          disabled={disabled}
          style={selectFieldRoot}
          labelStyle={Object.assign(styles.label, labelStyle)}
          iconStyle={Object.assign(styles.icon, iconStyle)}
          underlineStyle={styles.hideDropDownUnderline}
          autoWidth={autoWidth}
          value={value}
          onChange={onChange}
          {...other}
          ref="dropDownMenu"
        >
          {children}
        </DropDownMenu>
      </TextField>
    );
  }
}

export default SelectField;
