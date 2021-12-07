import  React  from 'react';
import './Block.scss';
import classNames from 'classnames';

const Block = ({children, className}) => <div className={classNames('block',className)}>{children}</div>;


export default Block;