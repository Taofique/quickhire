const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-360 mx-auto px-31 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
