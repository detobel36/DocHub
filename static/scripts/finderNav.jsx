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
                {child.item}
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
        /* Render current path.
           TODO: be more functional */
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

        /* Auto-scroll and width */
        var columns_width = (this.state.path.length + 1)*200;
        var left = 640 - columns_width;
        if (left > 0){left = 0;}
        var style_width = {width: columns_width+'px', marginLeft: left+'px'};
        return <div className="columnnav">
            <ul style={style_width} className="columnnav-container">
                {columns}
            </ul>
        </div>;
    }
});


/* Demo ! */
const data = {
    item: "Root",
    children: [
        {item: "Child 1", children: [
            {item: "Child A", children: [
                {item: "Child of A", children: [
                    {item: "Child of child of A", children: []}
                ]}
            ]},
            {item: "Child B", children: []}
        ]},
        {item: "Child 2", children: [
            {item: "Child A", children: [
                {item: "Child of A", children: [
                    {item: "Child of child of A", children: []}
                ]}
            ]},
            {item: "Child B", children: []}
        ]},
        {item: "Child 3", children: [
            {item: "Child A", children: [
                {item: "Child of A", children: [
                    {item: "Child of child of A", children: []}
                ]}
            ]},
            {item: "Child B", children: []}
        ]},
        {item: "Child 4", children: [{item: "Child A", children: []}]},
        {item: "Child 5", children: [{item: "Child A", children: []}]},
        {item: "Child 6", children: [{item: "Child A", children: []}]},
        {item: "Child 7", children: [{item: "Child A", children: []}]},
        {item: "Child 8", children: [{item: "Child A", children: []}]},
        {item: "Child 9", children: [{item: "Child A", children: []}]},
        {item: "Child 10", children: [{item: "Child A", children: []}]},
        {item: "Child 11", children: [{item: "Child A", children: []}]},
        {item: "Child 12", children: [{item: "Child A", children: []}]},
        {item: "Child 13", children: [{item: "Child A", children: []}]},
        {item: "Child 14", children: [{item: "Child A", children: []}]},
        {item: "Child 15", children: [
            {item: "Child A", children: [
                {item: "Child of A", children: [
                    {item: "Child of child of A", children: []}
                ]}
            ]},
            {item: "Child B", children: []}
        ]},
        {item: "Child 16", children: [{item: "Child A", children: []}]},
        {item: "Child 17", children: [{item: "Child A", children: []}]},
        {item: "Child 18", children: [{item: "Child A", children: []}]},
        {item: "Child 19", children: [{item: "Child A", children: []}]},
        {item: "Child 20", children: [{item: "Child A", children: []}]},
        {item: "Child 21", children: [{item: "Child A", children: []}]},
        {item: "Child 22", children: [{item: "Child A", children: []}]},
        {item: "Child 23", children: [{item: "Child A", children: []}]},
        {item: "Child 24", children: [{item: "Child 1", children: [
            {item: "Child A", children: [
                    {item: "Child of A", children: [
                        {item: "Child of child of A", children: []}
                    ]}
                ]},
                {item: "Child B", children: []}
            ]},
            {item: "Child 2", children: [
                {item: "Child A", children: [
                    {item: "Child of A", children: [
                        {item: "Child of child of A", children: []}
                    ]}
                ]},
                {item: "Child B", children: []}
            ]},
            {item: "Child 3", children: [
                {item: "Child A", children: [
                    {item: "Child of A", children: [
                        {item: "Child of child of A", children: []}
                    ]}
                ]},
                {item: "Child B", children: []}
            ]},
            {item: "Child 4", children: [{item: "Child A", children: []}]},
            {item: "Child 5", children: [{item: "Child A", children: []}]},
            {item: "Child 6", children: [{item: "Child A", children: []}]},
            {item: "Child 7", children: [{item: "Child A", children: []}]},
            {item: "Child 8", children: [{item: "Child A", children: []}]},
            {item: "Child 9", children: [{item: "Child A", children: []}]},
            {item: "Child 10", children: [{item: "Child A", children: []}]},
            {item: "Child 11", children: [{item: "Child A", children: []}]},
            {item: "Child 12", children: [{item: "Child A", children: []}]},
            {item: "Child 13", children: [{item: "Child A", children: []}]},
            {item: "Child 14", children: [{item: "Child A", children: []}]},
            {item: "Child 15", children: [
                {item: "Child A", children: [
                    {item: "Child of A", children: [
                        {item: "Child of child of A", children: []}
                    ]}
                ]},
                {item: "Child B", children: []}
            ]},
            {item: "Child 16", children: [{item: "Child A", children: []}]},
            {item: "Child 17", children: [{item: "Child A", children: []}]},
            {item: "Child 18", children: [{item: "Child A", children: []}]},
            {item: "Child 19", children: [{item: "Child A", children: []}]},
            {item: "Child 20", children: [{item: "Child A", children: []}]},
            {item: "Child 21", children: [{item: "Child A", children: []}]},
            {item: "Child 22", children: [{item: "Child A", children: []}]},
            {item: "Child 23", children: [{item: "Child A", children: []}]},
            {item: "Child 24", children: [{item: "Child A", children: []}]},
        ]},
    ]
};

ReactDOM.render(<ColumnNav root={data}/>, document.getElementById("the-demo"));
