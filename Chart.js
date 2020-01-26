let angleOffset = 180;
const colors = [
  "#FFB6C1",
  "#FFEBCD",
  "#87CEFA",
  "#7FFFD4",
  "#DDA0DD",
  "#D2B48C",
  "grey"
];

const HalfDonut = props => {
  const { colors, points, total } = props;
  const radius = 60;
  const circumference = Math.PI * radius;
  const dataPercentage = val => val / total;
  const sum = points.reduce((acc, value) => acc + value, 0);
  const allPoints = [...points, total - sum];

  const rotateTransformation = index => {
    if (index > 0) {
      angleOffset += 180 * dataPercentage(allPoints[index - 1]);
    }
    return `rotate(${angleOffset}, 80, 80)`;
  };

  return (
    <svg height="160" width="160" viewBox="0 0 160 160">
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" width="160" height="80" />
        </clipPath>
      </defs>
      <g clip-path="url(#cut-off-bottom)">
        {allPoints.map((point, index) => (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={colors[index]}
            strokeWidth="30"
            strokeDasharray={`${circumference * dataPercentage(point)} ${(1 -
              dataPercentage(point)) *
              circumference}`}
            transform={rotateTransformation(index)}
          />
        ))}
      </g>
    </svg>
  );
};

export default HalfDonut;