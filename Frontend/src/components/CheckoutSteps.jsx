import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: "Login", path: "/login", completed: step1 },
    { name: "Shipping", path: "/shipping", completed: step2 },
    { name: "Payment", path: "/payment", completed: step3 },
    { name: "Order", path: "/placeorder", completed: step4 },
  ];

  return (
    <div className="flex items-center justify-between mb-10 px-4 text-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step.completed
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-white"
              }`}
            >
              {index + 1}
            </div>

            {step.completed ? (
              <Link
                to={step.path}
                className="text-[10px] mt-1 font-bold uppercase tracking-wider text-blue-600"
              >
                {step.name}
              </Link>
            ) : (
              <span className="text-[10px] mt-1 font-bold uppercase tracking-wider text-gray-400">
                {step.name}
              </span>
            )}
          </div>

          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 mb-4 transition-colors ${
                steps[index + 1].completed ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
