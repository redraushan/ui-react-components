import React, { PropTypes } from 'react'
import { getContextualizer } from 'react-context-props'

export default getContextualizer({
  customizations: PropTypes.shape({
    color_button: PropTypes.string,
    color_button_text: PropTypes.string,
    color_checkbox: PropTypes.string,
    color_checkbox_checkmark: PropTypes.string,
    color_text: PropTypes.string,
    color_header: PropTypes.string,
    color_link: PropTypes.string,
    color_border: PropTypes.string,
    color_border_selected: PropTypes.string,
    color_details: PropTypes.string,
    color_text_secondary: PropTypes.string,
    radius_border: PropTypes.string
  })
})
