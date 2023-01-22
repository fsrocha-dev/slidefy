import PropTypes from 'prop-types'
import parse from 'html-react-parser'

const Slide = ({ children, transition = 'slide', background = '' }) => (
  <section data-background-color={background} data-transition={transition}>
    {parse(children)}
  </section>
)

Slide.propTypes = {
  children: PropTypes.node,
  transition: PropTypes.string,
}

export default Slide
