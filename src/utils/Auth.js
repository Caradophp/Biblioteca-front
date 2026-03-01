import React from "react";

export const getUserRole = () => {
    return localStorage.getItem("role");
};

export const hasRole = (rolesPermitidas) => {
    const role = getUserRole();
    return rolesPermitidas.includes(role);
};