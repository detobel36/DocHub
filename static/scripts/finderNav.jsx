const Column = React.createClass({
    setIndex: function(evt){
        var path_str = $(evt.currentTarget).attr('data-path')
        var path = path_str.split(',').map(function(x){return parseInt(x);});
        this.props.parent.changePath(path);
    },
    render: function(){
        var children = this.props.children.map(function(child, i){
            var p = this.props.path;
            if (this.props.path.length > 0){
                p += ',';
            }
            p += i;
            return <li data-path={p} onMouseEnter={this.setIndex}>
                {child.name}
            </li>;
        }.bind(this));
        return <li className="columnnav-column">
            <ul>
                {children}
            </ul>
        </li>;
    }
});

const ColumnNav = React.createClass({
    getInitialState: function() {
        return {path: []};
    },
    changePath: function(newPath){
        this.setState({path: newPath});
    },
    render: function(){
        var path = [], node = this.props.root;
        var columns = [<Column parent={this} path="" children={node.children}/>];
        for (var i=0; i<this.state.path.length; i++){
            var idx = this.state.path[i];
            path.push(idx);
            node = node.children[idx];
            if (node){
                columns.push(<Column parent={this} path={path.join(',')}
                                     children={node.children}/>);
            } else {
                break;
            }
        }
        var style_width = {
            width: (this.state.path.length + 1)*200+'px',
        };
        return <div className="columnnav">
            <ul style={style_width} className="columnnav-container">
                {columns}
            </ul>
        </div>;
    }
});


/* Demo ! */
const data = {
    name: "Root", 
    children: [
        {name: "Child 1", children: [
            {name: "Child A", children: [
                {name: "Child of A", children: [
                    {name: "Child of child of A", children: []}
                ]}
            ]},
            {name: "Child B", children: []}
        ]},
        {name: "Child 2", children: [
            {name: "Child A", children: [
                {name: "Child of A", children: [
                    {name: "Child of child of A", children: []}
                ]}
            ]},
            {name: "Child B", children: []}
        ]},
        {name: "Child 3", children: [
            {name: "Child A", children: [
                {name: "Child of A", children: [
                    {name: "Child of child of A", children: []}
                ]}
            ]},
            {name: "Child B", children: []}
        ]},
        {name: "Child 4", children: [{name: "Child A", children: []}]},
        {name: "Child 5", children: [{name: "Child A", children: []}]},
        {name: "Child 6", children: [{name: "Child A", children: []}]},
        {name: "Child 7", children: [{name: "Child A", children: []}]},
        {name: "Child 8", children: [{name: "Child A", children: []}]},
        {name: "Child 9", children: [{name: "Child A", children: []}]},
        {name: "Child 10", children: [{name: "Child A", children: []}]},
        {name: "Child 11", children: [{name: "Child A", children: []}]},
        {name: "Child 12", children: [{name: "Child A", children: []}]},
        {name: "Child 13", children: [{name: "Child A", children: []}]},
        {name: "Child 14", children: [{name: "Child A", children: []}]},
        {name: "Child 15", children: [
            {name: "Child A", children: [
                {name: "Child of A", children: [
                    {name: "Child of child of A", children: []}
                ]}
            ]},
            {name: "Child B", children: []}
        ]},
        {name: "Child 16", children: [{name: "Child A", children: []}]},
        {name: "Child 17", children: [{name: "Child A", children: []}]},
        {name: "Child 18", children: [{name: "Child A", children: []}]},
        {name: "Child 19", children: [{name: "Child A", children: []}]},
        {name: "Child 20", children: [{name: "Child A", children: []}]},
        {name: "Child 21", children: [{name: "Child A", children: []}]},
        {name: "Child 22", children: [{name: "Child A", children: []}]},
        {name: "Child 23", children: [{name: "Child A", children: []}]},
        {name: "Child 24", children: [{name: "Child 1", children: [
            {name: "Child A", children: [
                    {name: "Child of A", children: [
                        {name: "Child of child of A", children: []}
                    ]}
                ]},
                {name: "Child B", children: []}
            ]},
            {name: "Child 2", children: [
                {name: "Child A", children: [
                    {name: "Child of A", children: [
                        {name: "Child of child of A", children: []}
                    ]}
                ]},
                {name: "Child B", children: []}
            ]},
            {name: "Child 3", children: [
                {name: "Child A", children: [
                    {name: "Child of A", children: [
                        {name: "Child of child of A", children: []}
                    ]}
                ]},
                {name: "Child B", children: []}
            ]},
            {name: "Child 4", children: [{name: "Child A", children: []}]},
            {name: "Child 5", children: [{name: "Child A", children: []}]},
            {name: "Child 6", children: [{name: "Child A", children: []}]},
            {name: "Child 7", children: [{name: "Child A", children: []}]},
            {name: "Child 8", children: [{name: "Child A", children: []}]},
            {name: "Child 9", children: [{name: "Child A", children: []}]},
            {name: "Child 10", children: [{name: "Child A", children: []}]},
            {name: "Child 11", children: [{name: "Child A", children: []}]},
            {name: "Child 12", children: [{name: "Child A", children: []}]},
            {name: "Child 13", children: [{name: "Child A", children: []}]},
            {name: "Child 14", children: [{name: "Child A", children: []}]},
            {name: "Child 15", children: [
                {name: "Child A", children: [
                    {name: "Child of A", children: [
                        {name: "Child of child of A", children: []}
                    ]}
                ]},
                {name: "Child B", children: []}
            ]},
            {name: "Child 16", children: [{name: "Child A", children: []}]},
            {name: "Child 17", children: [{name: "Child A", children: []}]},
            {name: "Child 18", children: [{name: "Child A", children: []}]},
            {name: "Child 19", children: [{name: "Child A", children: []}]},
            {name: "Child 20", children: [{name: "Child A", children: []}]},
            {name: "Child 21", children: [{name: "Child A", children: []}]},
            {name: "Child 22", children: [{name: "Child A", children: []}]},
            {name: "Child 23", children: [{name: "Child A", children: []}]},
            {name: "Child 24", children: [{name: "Child A", children: []}]},
        ]},
    ]
};

ReactDOM.render(<ColumnNav root={data}/>, document.getElementById("the-demo"));
