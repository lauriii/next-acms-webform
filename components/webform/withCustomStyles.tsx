const withCustomStyles = (EnhancedComponent, fieldProps = {}, labelProps = {}, wrapperProps = {}) => {
  return function WebformElementWithCustomStyles(props) {
    return (
      <EnhancedComponent
        {...props}
        labelProps={labelProps}
        fieldProps={fieldProps}
        wrapperProps={wrapperProps}
      />
    );
  }
};

export default withCustomStyles;