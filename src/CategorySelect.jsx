import { useStates } from './utilities/states';

export default function CategorySelector(props) {

  let s = useStates('main');
  let { bindTo } = props;

  return <select {...s.bind(bindTo)}>
    <option key={0}>all</option>
    {s.categories.map(({ name, id }) =>
      <option key={id}>{name}</option>
    )}
  </select>

}