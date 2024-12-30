"use client"
import './Card.css';
import React, { MouseEventHandler } from "react";

interface CardProps {
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLDivElement>;
    id?: string;
    containerStyle?: React.CSSProperties;
}
export const Card: React.FC<CardProps> = ({ id, children, onClick, containerStyle }: CardProps) => {
    return <div key={id} className="card" onClick={onClick} style={containerStyle}>
        {children}
    </div>
}
