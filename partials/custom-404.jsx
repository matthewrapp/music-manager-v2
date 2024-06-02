const Custom404 = ({ errorMsg = "" }) => {
    return (
        <div className="four-four">
            <h2 style={{ color: '#fff' }}>{errorMsg}</h2>
        </div>
    )
};

export default Custom404;