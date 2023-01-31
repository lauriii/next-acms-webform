const withCustomStyles = (EnhancedComponent, fieldProps = {}, labelProps = {}, wrapperProps = {}, tableProps = {}, trProps = {}, tdProps = {}) => {
  return function WebformElementWithCustomStyles(props) {
    return (
      <EnhancedComponent
        {...props}
        labelProps={{
          ...(props.labelProps ?? {}),
          ...labelProps,
        }}
        fieldProps={{
          ...(props.fieldProps ?? {}),
          ...fieldProps
        }}
        wrapperProps={{
          ...(props.wrapperProps ?? {}),
          ...wrapperProps
        }}
        tableProps={{
          ...(props.tableProps ?? {}),
          ...tableProps,
        }}
        trProps={{
          ...(props.trProps ?? {}),
          ...trProps,
        }}
        tdProps={{
          ...(props.tdProps ?? {}),
          ...tdProps,
        }}
      />
    );
  }
};

export default withCustomStyles;