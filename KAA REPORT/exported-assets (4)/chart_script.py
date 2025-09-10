import plotly.graph_objects as go
import pandas as pd
from datetime import datetime

# Traffic data
dates = ["9/9/2025","9/8/2025","9/7/2025","9/6/2025","9/5/2025","9/4/2025","9/3/2025","9/2/2025","9/1/2025","8/31/2025"]
sessions = [11,9,5,7,14,12,17,7,13,8]
bounce_rate = [91,78,60,57,50,58,65,43,46,50]
duration_sec = [763,50,180,305,158,109,164,151,115,86]

# Convert dates to datetime and reverse order for chronological display
dates_dt = [datetime.strptime(date, "%m/%d/%Y") for date in dates]
df = pd.DataFrame({
    'dates': dates_dt,
    'sessions': sessions,
    'bounce_rate': bounce_rate,
    'duration_sec': duration_sec
}).sort_values('dates')

# Convert duration to minutes for better readability
df['duration_min'] = df['duration_sec'] / 60

# Create line chart
fig = go.Figure()

fig.add_trace(go.Scatter(
    x=df['dates'],
    y=df['sessions'],
    mode='lines+markers',
    name='Sessions',
    line=dict(color='#1FB8CD', width=3),
    marker=dict(size=8),
    hovertemplate='<b>%{x|%b %d}</b><br>Sessions: %{y}<br>Bounce Rate: %{customdata[0]}%<br>Avg Duration: %{customdata[1]:.1f}m<extra></extra>',
    customdata=list(zip(df['bounce_rate'], df['duration_min']))
))

fig.update_layout(
    title='Website Traffic Trends',
    xaxis_title='Date',
    yaxis_title='Sessions',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("traffic_analysis.png")