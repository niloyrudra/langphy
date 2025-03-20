declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react';
    const content: React.FC<SvgProps>;
    export default content;
}