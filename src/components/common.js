/** @jsx jsx */
import { jsx } from "theme-ui";
import { motion } from "framer-motion";
import React from "react";

const commonFormStyle = {
  display: "inline-block",
  py: 2,
  fontSize: 0,
  appearance: "none",
  margin: 0
};

function Input(props) {
  return (
    <input
      sx={{
        ...commonFormStyle,
        bg: "white",
        border: "1px solid",
        borderColor: "gray.3",
        borderRadius: "default",
        px: 2
      }}
      {...props}
    />
  );
}

function BaseButton(
  {
    as: Component = "button",
    variant = "primary",
    whileHover,
    whileTap,
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      sx={{
        ...commonFormStyle,
        textDecoration: "none",
        px: 3,
        variant: `buttons.${variant}`
      }}
      {...props}
    />
  );
}

const MotionButton = motion.custom(React.forwardRef(BaseButton));
function Button(props) {
  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    />
  );
}

function ArrowDown(props, ref) {
  const { animate, variants, ...restProps } = props;
  return (
    <svg width={24} height={24} ref={ref} {...restProps}>
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      <path fill="none" d="M0 0h24v24H0V0z" />
    </svg>
  );
}

const arrowVariants = {
  open: { rotate: 0 },
  closed: { rotate: -90 }
};
const MotionArrow = motion.custom(React.forwardRef(ArrowDown));

function ArrowIcon(props) {
  const { isExpanded } = props;
  return (
    <MotionArrow
      animate={isExpanded ? "open" : "closed"}
      variants={arrowVariants}
      sx={{
        fill: "currentColor"
      }}
    />
  );
}

function Heading({ children, ...props }) {
  return (
    <h2
      sx={{
        m: 0,
        color: "secondary",
        textTransform: "uppercase",
        fontSize: 1,
        letterSpacing: 2,
        mb: 4
      }}
      {...props}
    >
      {children}
    </h2>
  );
}

export { Button, ArrowIcon, Heading, Input };
