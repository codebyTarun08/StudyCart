 const IconBtn=({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) => {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 px-5 rounded-md  font-semibold text-center text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
            <span className="text-center">{text}</span>
        )}
      </button>
    )
  }

export default IconBtn