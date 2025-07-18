"use client";
import React from "react";

function MainComponent() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [detections, setDetections] = React.useState([
    {
      id: "DET-001",
      size: "15.2 m²",
      confidence: 94,
      coordinates: { lat: 35.6762, lng: 139.6503 },
      timestamp: "2025-01-08 14:30:22",
      status: "new",
      location: "Tokyo Bay, Japan",
      depth: "12m",
      netType: "Trawl Net",
      estimatedAge: "6 months",
    },
    {
      id: "DET-002",
      size: "8.7 m²",
      confidence: 87,
      coordinates: { lat: 40.7128, lng: -74.006 },
      timestamp: "2025-01-08 12:15:45",
      status: "verified",
      location: "New York Harbor, USA",
      depth: "8m",
      netType: "Gill Net",
      estimatedAge: "3 months",
    },
    {
      id: "DET-003",
      size: "22.1 m²",
      confidence: 91,
      coordinates: { lat: 51.5074, lng: -0.1278 },
      timestamp: "2025-01-08 09:45:12",
      status: "cleaned",
      location: "Thames Estuary, UK",
      depth: "15m",
      netType: "Seine Net",
      estimatedAge: "1 year",
    },
  ]);

  // Real-time data simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new detection every 30 seconds
      if (Math.random() > 0.7) {
        const locations = [
          { name: "Mediterranean Sea", lat: 41.9028, lng: 12.4964 },
          { name: "North Sea", lat: 56.0, lng: 3.0 },
          { name: "Baltic Sea", lat: 58.0, lng: 20.0 },
          { name: "Adriatic Sea", lat: 43.0, lng: 16.0 },
        ];
        const location =
          locations[Math.floor(Math.random() * locations.length)];
        const netTypes = ["Trawl Net", "Gill Net", "Seine Net", "Drift Net"];

        const newDetection = {
          id: `DET-${String(Date.now()).slice(-3)}`,
          size: `${(Math.random() * 25 + 5).toFixed(1)} m²`,
          confidence: Math.floor(Math.random() * 20 + 80),
          coordinates: {
            lat: location.lat + (Math.random() - 0.5) * 2,
            lng: location.lng + (Math.random() - 0.5) * 2,
          },
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
          status: "new",
          location: location.name,
          depth: `${Math.floor(Math.random() * 30 + 5)}m`,
          netType: netTypes[Math.floor(Math.random() * netTypes.length)],
          estimatedAge: `${Math.floor(Math.random() * 12 + 1)} months`,
        };

        setDetections((prev) => [newDetection, ...prev.slice(0, 19)]); // Keep max 20 detections
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const [satellites, setSatellites] = React.useState([
    {
      id: "SAT-001",
      name: "Sentinel-1A (SAR)",
      type: "SAR",
      status: "processing",
      lastUpdate: "2025-01-08 15:22:10",
      coverageArea: "290 km²",
      revisitFreq: "5 days",
      signalStrength: 95,
    },
    {
      id: "SAT-002",
      name: "TerraSAR-X",
      type: "SAR",
      status: "completed",
      lastUpdate: "2025-01-08 13:45:33",
      coverageArea: "185 km²",
      revisitFreq: "11 days",
      signalStrength: 88,
    },
    {
      id: "SAT-003",
      name: "COSMO-SkyMed",
      type: "SAR",
      status: "queued",
      lastUpdate: "2025-01-08 11:20:15",
      coverageArea: "2330 km²",
      revisitFreq: "1 day",
      signalStrength: 92,
    },
    {
      id: "SAT-004",
      name: "Sentinel-1B (SAR)",
      type: "SAR",
      status: "error",
      lastUpdate: "2025-01-08 08:12:44",
      coverageArea: "250 km²",
      revisitFreq: "6 days",
      signalStrength: 45,
    },
  ]);

  const [exportHistory, setExportHistory] = React.useState([
    {
      id: 1,
      type: "PDF",
      date: "2025-01-08",
      size: "2.3 MB",
      status: "completed",
    },
    {
      id: 2,
      type: "CSV",
      date: "2025-01-07",
      size: "1.1 MB",
      status: "completed",
    },
    {
      id: 3,
      type: "GeoJSON",
      date: "2025-01-06",
      size: "3.7 MB",
      status: "completed",
    },
  ]);

  const updateDetectionStatus = (id, newStatus) => {
    setDetections((prev) =>
      prev.map((det) => (det.id === id ? { ...det, status: newStatus } : det))
    );
  };

  const addNewDetection = () => {
    const newDetection = {
      id: `DET-${String(detections.length + 1).padStart(3, "0")}`,
      size: `${(Math.random() * 20 + 5).toFixed(1)} m²`,
      confidence: Math.floor(Math.random() * 20 + 80),
      coordinates: {
        lat: (Math.random() * 180 - 90).toFixed(4),
        lng: (Math.random() * 360 - 180).toFixed(4),
      },
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      status: "new",
    };
    setDetections((prev) => [newDetection, ...prev]);
  };

  const generatePDF = () => {
    const pdfContent = `
PHANTOMNET SAR DETECTION REPORT
Generated: ${new Date().toLocaleString()}
========================================

EXECUTIVE SUMMARY
- Total Detections: ${detections.length}
- New Detections: ${detections.filter((d) => d.status === "new").length}
- Verified Detections: ${
      detections.filter((d) => d.status === "verified").length
    }
- Cleaned Areas: ${detections.filter((d) => d.status === "cleaned").length}

DETECTION DETAILS
========================================
${detections
  .map(
    (detection) => `
Detection ID: ${detection.id}
Location: ${detection.location}
Coordinates: ${detection.coordinates.lat}, ${detection.coordinates.lng}
Size: ${detection.size}
Confidence: ${detection.confidence}%
Depth: ${detection.depth}
Net Type: ${detection.netType}
Estimated Age: ${detection.estimatedAge}
Status: ${detection.status.toUpperCase()}
Detected: ${detection.timestamp}
----------------------------------------`
  )
  .join("")}

SAR SATELLITE STATUS
========================================
${satellites
  .map(
    (sat) => `
Satellite: ${sat.name}
Status: ${sat.status.toUpperCase()}
Coverage: ${sat.coverageArea}
Signal Strength: ${sat.signalStrength}%
Last Update: ${sat.lastUpdate}
----------------------------------------`
  )
  .join("")}

Report generated by PhantomNet SAR Detection System
Contact: admin@phantomnet.com
`;

    // Create and download PDF-like text file
    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PhantomNet_Detection_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Add to export history
    const newExport = {
      id: exportHistory.length + 1,
      type: "PDF",
      date: new Date().toISOString().slice(0, 10),
      size: `${(pdfContent.length / 1024).toFixed(1)} KB`,
      status: "completed",
    };
    setExportHistory((prev) => [newExport, ...prev]);
  };

  const exportData = (format) => {
    if (format === "PDF") {
      generatePDF();
      return;
    }

    let content = "";
    let filename = "";
    let mimeType = "text/plain";

    if (format === "CSV") {
      content =
        "ID,Location,Latitude,Longitude,Size,Confidence,Depth,NetType,Age,Status,Timestamp\n" +
        detections
          .map(
            (d) =>
              `${d.id},"${d.location}",${d.coordinates.lat},${d.coordinates.lng},"${d.size}",${d.confidence},"${d.depth}","${d.netType}","${d.estimatedAge}",${d.status},"${d.timestamp}"`
          )
          .join("\n");
      filename = `ghost_nets_data_${new Date().toISOString().slice(0, 10)}.csv`;
      mimeType = "text/csv";
    } else if (format === "GeoJSON") {
      const geoData = {
        type: "FeatureCollection",
        features: detections.map((d) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [d.coordinates.lng, d.coordinates.lat],
          },
          properties: {
            id: d.id,
            location: d.location,
            size: d.size,
            confidence: d.confidence,
            depth: d.depth,
            netType: d.netType,
            estimatedAge: d.estimatedAge,
            status: d.status,
            timestamp: d.timestamp,
          },
        })),
      };
      content = JSON.stringify(geoData, null, 2);
      filename = `ghost_nets_locations_${new Date()
        .toISOString()
        .slice(0, 10)}.geojson`;
      mimeType = "application/json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const newExport = {
      id: exportHistory.length + 1,
      type: format,
      date: new Date().toISOString().slice(0, 10),
      size: `${(content.length / 1024).toFixed(1)} KB`,
      status: "completed",
    };
    setExportHistory((prev) => [newExport, ...prev]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-cyan-100 text-cyan-800";
      case "verified":
        return "bg-amber-100 text-amber-800";
      case "cleaned":
        return "bg-emerald-100 text-emerald-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "queued":
        return "bg-slate-100 text-slate-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getSignalStrengthColor = (strength) => {
    if (strength >= 90) return "text-emerald-500";
    if (strength >= 70) return "text-amber-500";
    return "text-red-500";
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
          <i className="fas fa-satellite-dish text-white text-2xl"></i>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            SAR Detection Dashboard
          </h1>
          <p className="text-slate-600">
            Real-time ghost net monitoring via synthetic aperture radar
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl shadow-lg border border-cyan-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
              <i className="fas fa-satellite text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">
                Active SAR Satellites
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {
                  satellites.filter(
                    (s) => s.status === "processing" || s.status === "completed"
                  ).length
                }
              </p>
              <p className="text-xs text-cyan-600 mt-1">
                <i className="fas fa-signal mr-1"></i>Signal Strong
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-lg border border-emerald-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
              <i className="fas fa-crosshairs text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">
                Ghost Net Detections
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {detections.length}
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                <i className="fas fa-eye mr-1"></i>AI Verified
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-purple-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
              <i className="fas fa-globe-americas text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">
                Ocean Coverage
              </p>
              <p className="text-2xl font-bold text-slate-800">3,055 km²</p>
              <p className="text-xs text-purple-600 mt-1">
                <i className="fas fa-waves mr-1"></i>Deep Scan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SAR Connection Status */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="fas fa-satellite-dish text-3xl text-cyan-400"></i>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold">SAR Network Status</h3>
              <p className="text-slate-300">
                Connected to {satellites.length} synthetic aperture radar
                satellites
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">ONLINE</div>
            <div className="text-sm text-slate-400">Last sync: 2 min ago</div>
          </div>
        </div>
      </div>

      {/* Recent Detections */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center space-x-3">
            <i className="fas fa-radar text-xl text-cyan-600"></i>
            <h2 className="text-xl font-semibold text-slate-800">
              Recent SAR Detections
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {detections.slice(0, 5).map((detection) => (
              <div
                key={detection.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <i className="fas fa-crosshairs text-cyan-600"></i>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{detection.id}</p>
                    <p className="text-sm text-slate-600">
                      <i className="fas fa-clock mr-1"></i>
                      {detection.timestamp}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-800">
                    <i className="fas fa-expand-arrows-alt mr-1"></i>Size:{" "}
                    {detection.size}
                  </p>
                  <p className="text-sm text-slate-600">
                    <i className="fas fa-percentage mr-1"></i>Confidence:{" "}
                    {detection.confidence}%
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    detection.status
                  )}`}
                >
                  <i className="fas fa-circle mr-1 text-xs"></i>
                  {detection.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSatelliteFeeds = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
          <i className="fas fa-satellite text-white text-2xl"></i>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            SAR Satellite Network
          </h1>
          <p className="text-slate-600">
            Synthetic Aperture Radar constellation monitoring
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center space-x-3">
            <i className="fas fa-satellite-dish text-xl text-cyan-600"></i>
            <h2 className="text-xl font-semibold text-slate-800">
              Active SAR Satellites
            </h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-satellite mr-2"></i>Satellite
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-signal mr-2"></i>Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-clock mr-2"></i>Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-expand-arrows-alt mr-2"></i>Coverage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-redo mr-2"></i>Revisit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-wifi mr-2"></i>Signal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {satellites.map((satellite) => (
                <tr
                  key={satellite.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-cyan-100 rounded-lg mr-3">
                        <i className="fas fa-satellite text-cyan-600"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          {satellite.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          <i className="fas fa-tag mr-1"></i>
                          {satellite.id} • {satellite.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        satellite.status
                      )}`}
                    >
                      <i className="fas fa-circle mr-1 text-xs"></i>
                      {satellite.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    <i className="fas fa-clock mr-2 text-slate-400"></i>
                    {satellite.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    <i className="fas fa-expand-arrows-alt mr-2 text-slate-400"></i>
                    {satellite.coverageArea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    <i className="fas fa-redo mr-2 text-slate-400"></i>
                    {satellite.revisitFreq}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <i
                        className={`fas fa-wifi mr-2 ${getSignalStrengthColor(
                          satellite.signalStrength
                        )}`}
                      ></i>
                      <span
                        className={`font-medium ${getSignalStrengthColor(
                          satellite.signalStrength
                        )}`}
                      >
                        {satellite.signalStrength}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDetectionMap = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
            <i className="fas fa-map text-white text-2xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Interactive Detection Map
            </h1>
            <p className="text-slate-600">
              Real-time ghost net locations with detailed information
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={addNewDetection}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <i className="fas fa-plus mr-2"></i>Add Detection
          </button>
          <button
            onClick={generatePDF}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <i className="fas fa-file-pdf mr-2"></i>Download PDF
          </button>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-globe-americas text-xl text-cyan-600"></i>
              <h2 className="text-xl font-semibold text-slate-800">
                Live Ghost Net Locations
              </h2>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-slate-600">
                  New ({detections.filter((d) => d.status === "new").length})
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-slate-600">
                  Verified (
                  {detections.filter((d) => d.status === "verified").length})
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-slate-600">
                  Cleaned (
                  {detections.filter((d) => d.status === "cleaned").length})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[500px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Simplified world map paths */}
              <path
                d="M150,200 Q200,180 250,200 L300,190 L350,210 L400,200 L450,220 L500,210 L550,230 L600,220 L650,240 L700,230 L750,250 L800,240 L850,260"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M100,300 Q150,280 200,300 L250,290 L300,310 L350,300 L400,320 L450,310 L500,330 L550,320 L600,340 L650,330 L700,350 L750,340 L800,360"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Detection Points */}
          {detections.map((detection, index) => {
            const x = ((detection.coordinates.lng + 180) / 360) * 100;
            const y = ((90 - detection.coordinates.lat) / 180) * 100;
            const statusColors = {
              new: "bg-red-500 animate-pulse",
              verified: "bg-amber-500",
              cleaned: "bg-emerald-500",
            };

            return (
              <div
                key={detection.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Detection Point */}
                <div
                  className={`w-4 h-4 rounded-full ${
                    statusColors[detection.status]
                  } shadow-lg border-2 border-white`}
                >
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-current"></div>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  <div className="text-sm font-semibold">{detection.id}</div>
                  <div className="text-xs text-slate-300">
                    {detection.location}
                  </div>
                  <div className="text-xs text-slate-300">
                    Size: {detection.size}
                  </div>
                  <div className="text-xs text-slate-300">
                    Depth: {detection.depth}
                  </div>
                  <div className="text-xs text-slate-300">
                    Type: {detection.netType}
                  </div>
                  <div className="text-xs text-slate-300">
                    Age: {detection.estimatedAge}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>
            );
          })}

          {/* Scanning Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
          </div>

          {/* Real-time indicator */}
          <div className="absolute top-4 right-4 bg-slate-800 bg-opacity-80 text-white px-3 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detection Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {detections.map((detection) => (
          <div
            key={detection.id}
            className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <i className="fas fa-crosshairs text-cyan-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {detection.id}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  detection.status
                )}`}
              >
                <i className="fas fa-circle mr-1 text-xs"></i>
                {detection.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400"></i>
                <span className="font-medium">Location:</span>{" "}
                <span className="ml-1">{detection.location}</span>
              </p>
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-expand-arrows-alt mr-2 text-slate-400"></i>
                <span className="font-medium">Size:</span>{" "}
                <span className="ml-1">{detection.size}</span>
              </p>
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-water mr-2 text-slate-400"></i>
                <span className="font-medium">Depth:</span>{" "}
                <span className="ml-1">{detection.depth}</span>
              </p>
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-net-wired mr-2 text-slate-400"></i>
                <span className="font-medium">Net Type:</span>{" "}
                <span className="ml-1">{detection.netType}</span>
              </p>
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-clock mr-2 text-slate-400"></i>
                <span className="font-medium">Age:</span>{" "}
                <span className="ml-1">{detection.estimatedAge}</span>
              </p>
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-percentage mr-2 text-slate-400"></i>
                <span className="font-medium">Confidence:</span>{" "}
                <span className="ml-1">{detection.confidence}%</span>
              </p>
              <p className="text-sm text-slate-600 flex items-center">
                <i className="fas fa-calendar-alt mr-2 text-slate-400"></i>
                <span className="font-medium">Detected:</span>{" "}
                <span className="ml-1">{detection.timestamp}</span>
              </p>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              {detection.status === "new" && (
                <button
                  onClick={() =>
                    updateDetectionStatus(detection.id, "verified")
                  }
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  <i className="fas fa-check-circle mr-2"></i>Verify
                </button>
              )}
              {detection.status === "verified" && (
                <button
                  onClick={() => updateDetectionStatus(detection.id, "cleaned")}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  <i className="fas fa-broom mr-2"></i>Mark Cleaned
                </button>
              )}
              <button
                onClick={() => alert("Simulating detailed view for " + detection.id)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
              >
                <i className="fas fa-info-circle mr-2"></i>Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExportHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
          <i className="fas fa-history text-white text-2xl"></i>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Export History</h1>
          <p className="text-slate-600">
            Review and manage your data export records
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center space-x-3">
            <i className="fas fa-file-export text-xl text-cyan-600"></i>
            <h2 className="text-xl font-semibold text-slate-800">
              Generated Reports & Data
            </h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-hashtag mr-2"></i>ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-file-alt mr-2"></i>Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-calendar-alt mr-2"></i>Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-database mr-2"></i>Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-info-circle mr-2"></i>Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <i className="fas fa-cogs mr-2"></i>Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {exportHistory.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    {record.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    {record.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        record.status
                      )}`}
                    >
                      <i className="fas fa-circle mr-1 text-xs"></i>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alert(`Downloading ${record.type} ID: ${record.id}`)}
                      className="text-cyan-600 hover:text-cyan-900 mr-4"
                    >
                      <i className="fas fa-download mr-1"></i>Download
                    </button>
                    <button
                      onClick={() => alert(`Deleting record ID: ${record.id}`)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <i className="fas fa-trash mr-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 flex justify-end space-x-3">
          <button
            onClick={() => exportData("CSV")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
          >
            <i className="fas fa-file-csv mr-2"></i>Export CSV
          </button>
          <button
            onClick={() => exportData("GeoJSON")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
          >
            <i className="fas fa-globe mr-2"></i>Export GeoJSON
          </button>
          <button
            onClick={() => exportData("PDF")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
          >
            <i className="fas fa-file-pdf mr-2"></i>Export PDF
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased text-slate-800">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss"></script>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 md:p-8 flex flex-col shadow-lg">
          <div className="flex items-center mb-10">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg mr-3">
              <i className="fas fa-satellite-dish text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white">PhantomNet</h2>
          </div>

          <nav className="flex-grow">
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === "dashboard"
                      ? "bg-slate-700 text-cyan-400 shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <i className="fas fa-tachometer-alt mr-3 text-lg"></i>
                  <span className="font-medium">Dashboard</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("satelliteFeeds")}
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === "satelliteFeeds"
                      ? "bg-slate-700 text-cyan-400 shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <i className="fas fa-satellite mr-3 text-lg"></i>
                  <span className="font-medium">Satellite Feeds</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("detectionMap")}
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === "detectionMap"
                      ? "bg-slate-700 text-cyan-400 shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <i className="fas fa-map-marked-alt mr-3 text-lg"></i>
                  <span className="font-medium">Detection Map</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab("exportHistory")}
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === "exportHistory"
                      ? "bg-slate-700 text-cyan-400 shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <i className="fas fa-history mr-3 text-lg"></i>
                  <span className="font-medium">Export History</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-700">
            <div className="flex items-center text-slate-400">
              <i className="fas fa-user-circle text-2xl mr-3"></i>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm">phantomnet@example.com</p>
              </div>
            </div>
            <button className="mt-4 w-full p-3 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors duration-200 shadow-md">
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "satelliteFeeds" && renderSatelliteFeeds()}
          {activeTab === "detectionMap" && renderDetectionMap()}
          {activeTab === "exportHistory" && renderExportHistory()}
        </main>
      </div>
    </div>
  );
}

export default MainComponent;
