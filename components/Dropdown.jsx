import React, { PropTypes, Component } from 'react'
import classNamesBind from 'classnames/bind'
import defaultStyles from '@klarna/ui-css-components/src/components/dropdown.scss'
import * as programmaticFocus from '../lib/features/programmaticFocus'
import * as fieldStates from '../lib/features/fieldStates'
import * as inlinedIcon from '../lib/features/inlinedIcon'
import { position, size } from '../lib/features/stacking'
import { handleKeyDown } from '../lib/features/keyboardEvents'

export default class Dropdown extends Component {
  constructor () {
    super()

    this.state = {
      hover: false
    }
  }

  componentDidMount () {
    programmaticFocus.maybeFocus(document)(this.props.focus, this.refs.select)
  }

  componentDidUpdate () {
    programmaticFocus.maybeFocus(document)(this.props.focus, this.refs.select)
  }

  onMouseEnter () {
    this.setState({
      ...this.state,
      hover: true
    })
  }

  onMouseLeave () {
    this.setState({
      ...this.state,
      hover: false
    })
  }

  render () {
    const {
      className,
      customize,
      disabled,
      error,
      focus,
      label,
      loading,
      onBlur,
      onChange,
      onClick,
      onFocus,
      options,
      square,
      styles,
      value,
      warning,
      ...props
    } = this.props

    const classNames = classNamesBind.bind({ ...defaultStyles, ...styles })
    const problem = error || warning
    const selectedOption = options && options.find((option) => String(option.value) === String(value))

    const classes = {
      dropdown: classNames(
        'cui__dropdown--native',
        {
          'is-loading': loading,
          'is-selected': value != null,
          square
        },
        fieldStates.getClassName(this.props),
        position.getClassName(this.props),
        programmaticFocus.getClassName(this.props),
        size.getClassName(this.props),
        className
      ),
      label: classNames({
        'cui__dropdown--native__floating-label': problem,
        'cui__dropdown--native__label': !problem
      }),
      currentOption: classNames('cui__dropdown--native__current-option'),
      select: classNames('cui__dropdown--native__select')
    }

    const hasNonDefaultState = disabled || warning || error
    const useDynamicStyles = customize && !hasNonDefaultState

    const dynamicStyles = useDynamicStyles
    ? {
      borderColor: this.state.hover || focus ? customize.borderColorSelected : customize.borderColor,
      boxShadow: focus && `0 0 4px ${customize.borderColorSelected}`,
      ...position.getBorderRadii(this.props, customize.borderRadius)
    }
    : undefined

    const labelDynamicStyles = useDynamicStyles
    ? {
      color: customize.labelColor
    }
    : undefined

    return (
      <div
        className={classes.dropdown}
        onClick={onClick}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        style={dynamicStyles}
      >
        <label className={classes.label} style={labelDynamicStyles}>{label}</label>
        {
          selectedOption &&
            <div className={classes.currentOption}>{selectedOption.label}</div>
        }
        <select
          className={classes.select}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={handleKeyDown(this.props)}
          ref='select'
          value={value || ''}
          {...props}
        >
          {
            options && options.map((attributes) => (
              <option key={attributes.value} {...attributes}>
                {attributes.label}
              </option>
            ))
          }
        </select>
      </div>
    )
  }
}

Dropdown.optionShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
})

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.arrayOf(Dropdown.optionShape),
  styles: PropTypes.object,
  value: PropTypes.any,
  ...inlinedIcon.propTypes,
  ...fieldStates.propTypes,
  ...handleKeyDown.propTypes,
  ...position.propTypes,
  ...programmaticFocus.propTypes,
  ...size.propTypes
}

Dropdown.defaultProps = {
  loading: false,
  onChange: function () {},
  ...inlinedIcon.defaultProps,
  ...fieldStates.defaultProps,
  ...position.defaultProps,
  ...handleKeyDown.defaultProps,
  ...size.defaultProps
}
