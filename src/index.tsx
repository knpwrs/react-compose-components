import React, {
  ComponentType,
  ReactElement,
} from 'react';

export type InputType = string
  | ComponentType
  | [ComponentType, { [name: string]: any }]
  | [string, { [name: string ]: any }];

export interface Props {
  components: InputType[];
  children?: any;
}

const Compose: ComponentType<Props> = ({ components, children }: Props) => (
  components.reduceRight<ReactElement<any>>((prev, curr) => {
    if (Array.isArray(curr)) {
      const [Comp, props] = curr;
      return (
        <Comp {...props}>{prev}</Comp>
      );
    }
    const Comp = curr;
    return (
      <Comp>{prev}</Comp>
    );
  }, children)
);

export default Compose;
